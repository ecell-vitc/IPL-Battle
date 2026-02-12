from admin.models import *
from participant.models import *
from auctioneer.models import *
import csv


def read_players():

    choices = {
        'ALL-ROUNDER': 'AR',
        'BATSMAN': 'BA',
        'BOWLER': 'BO',
        'WICKETKEEPER': 'WK'
    }

    with open('./players.csv') as f:
        reader = csv.DictReader(f)
        order = 1
        for row in reader:
            Player(
                name=row['fname'] + ' ' + row['lname'],
                domestic=row['domestic'] == 'Indian',
                score=int(row['score']),
                domain=choices[row['domain'].strip().upper()],
                base_price=int(row['base_price']),
                order=order
            ).save()
            print('Saved', order)
            order += 1

def read_auc():
    player = Player.objects.get(order=1)
    with open('./auc.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            r = Room(name=row['room'], curr_player=player)
            r.save()

            u = User(
                username=row['room'],
                password=row['password'],
                is_auc=True
            )
            u.save()

            Auctioneer(user=u, room=r).save()


def read_users():
    rooms = Room.objects.all()
    ct = 0

    with open('./users.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            u = User(
                username=row['name'],
                password=row['password']
            )
            u.save()

            Participant(user=u, name=u.username, room=rooms[ct//10]).save()
            ct += 1