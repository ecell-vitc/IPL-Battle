from participant.models import Participant, Team
from auctioneer.models import Auctioneer
from .models import Room, Player, User

import uuid, random

def __get_participant_room(user: User):
    participant = Participant.objects.get(user=user)
    return {
        'name': participant.name,
        'balance': participant.balance,
        'players': dict([
            (team_player.uid.hex, {
                'player_id': team_player.player.uid.hex,
                'price': team_player.price
            }) 
            for team_player in Team.objects.filter(participant=participant)
        ]),
    }


def __get_auctioneer_room(room: Room):
    return {
        'participants': dict([
            (participant.user.uid.hex, {
                'name': participant.name,
                'balance': participant.balance,
                'players': dict([
                    (team_player.uid.hex, {
                        'player_id': team_player.player.uid.hex,
                        'price': team_player.price
                    }) 
                    for team_player in Team.objects.filter(participant=participant)
                ])
            }) for participant in Participant.objects.filter(room=room)
        ])
    }


def update_curr_player(room: Room, player_uid: str):
    player = Player.objects.get(uid=uuid.UUID(player_uid))
    room.curr_player = player
    room.save()

    return player.uid.hex


def allocate_player(room: Room, participant_id: str, amt: int):
    room.refresh_from_db()
    participant = Participant.objects.get(user__uid=uuid.UUID(participant_id), room=room)

    if (participant.balance < amt): return { 'valid': False, 'message': 'Insufficient funds!' }
    if is_player_allocated(room): return { 'valid': False, 'message': 'Player already allocated!' }
    if (amt < room.curr_player.base_price): return { 'valid': False, 'message': 'Amount should be above base price!' }

    participant.balance -= amt
    participant.save()
    team = Team(participant=participant, player=room.curr_player, price=amt)
    team.save()

    return {
        'valid': True,
        'uid': participant_id,
        'balance': participant.balance,
        'entry_id': team.uid.hex,
        'player': room.curr_player.uid.hex,
        'price': amt
    }


def remove_entry(room: Room, entry_id: str):
    team = Team.objects.get(participant__room=room, uid=uuid.UUID(entry_id))
    participant = team.participant
    participant.balance += team.price
    participant.save()
    team.delete()

    return {
        'uid': participant.user.uid.hex,
        'entry_id': entry_id
    }


def is_player_allocated(room: Room):
    return len(Team.objects.filter(participant__room=room, player=room.curr_player)) > 0


def get_room_data(user: User, room: Room):
    players = [player for player in Player.objects.all().order_by('order')]
    random.seed(room.seed)
    random.shuffle(players)

    if not room.curr_player:
        room.curr_player = players[0]
        room.save()

    return {
        "uid": user.uid.hex,
        "all_players": dict([
            (players[i].uid.hex, {
                'name': players[i].name,
                'is_domestic': players[i].domestic,
                'score': players[i].score,
                'domain': players[i].domain,
                'prev': None if i == 0 else players[i-1].uid.hex,
                'next': None if i+1 == len(players) else players[i+1].uid.hex,
                'base_price': players[i].base_price,
                'order': players[i].order
            }) for i in range(len(players))
        ]),
        "curr_player": room.curr_player.uid.hex,
        **(__get_auctioneer_room(room) if user.is_admin or user.is_auc else __get_participant_room(user))
    }