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

    with open('./scripts/players.csv') as f:
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
    with open('./scripts/auc.csv') as f:
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

    with open('./scripts/users.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            u = User(
                username=row['name'],
                password=row['password']
            )
            u.save()

            Participant(user=u, name=u.username, room=rooms[ct//10]).save()
            ct += 1

def read_questions():
    with open('./scripts/questions.csv') as f:
        reader = csv.DictReader(f)
        for row in reader:
            q = Question(
                room=Room.objects.get(name=row['room']),
                question=row['question'],
                options={
                    'A': row['optionA'],
                    'B': row['optionB'],
                    'C': row['optionC'],
                    'D': row['optionD']
                },
                correct_answer=row['correct_answer']
            )
            q.save()