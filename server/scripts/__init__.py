from admin.models import *
from participant.models import *
from auctioneer.models import *
import csv, random


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
                domestic=row['country'] == 'India',
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
    questions = []
    with open('./scripts/questions.csv') as f:
        reader = csv.DictReader(f)
        for row in reader: questions.append(row)

    for room in Room.objects.all():
        selected = random.sample(questions, 10)
        for question in selected:
            Question(
                room=room,
                question=question['question'],
                options={
                    'A': question['optionA'],
                    'B': question['optionB'],
                    'C': question['optionC'],
                    'D': question['optionD']
                },
                correct_answer=question['correct_answer']
            ).save()