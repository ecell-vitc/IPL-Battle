from django.http import JsonResponse
from admin.models import Question, Scores, Room, Player
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny

import uuid, random
from lib import logic

@api_view(['GET'])
@permission_classes([AllowAny])
def get_board(req, id):
    try: room = Room.objects.get(uid=uuid.UUID(id))
    except: return JsonResponse({ 'valid': False, 'message': 'Room not found!' })

    return JsonResponse(logic.get_leaderboard(room))


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def questions(request, uid):
    if request.method == 'GET':
        questions = Question.objects.filter(room__uid=uid)
        response_data = [
            {
                "room_name": q.room.name,
                "uid": q.uid.hex, 
                "question": q.question,
                "options": {
                    "A": q.options.get('A'),
                    "B": q.options.get('B'),
                    "C": q.options.get('C'),
                    "D": q.options.get('D')
                }
            } for q in questions
        ]
        return JsonResponse(response_data, safe=False)

    data = request.data
    teamname = data.get('teamname')
    options_chosen = data.get('optionsChosen', [])
    
    total_points = 0
    room_questions = { str(q.uid.hex): q for q in Question.objects.filter(room__uid=uid) }
    
    for entry in options_chosen:
        q_id = str(entry.get('questionId'))
        submitted_option = entry.get('option')
        time_taken = float(entry.get('timeTaken', 12))

        if q_id in room_questions:
            question = room_questions[q_id]
            if question.correct_answer == submitted_option:
                q_score = (-100 * time_taken / 12.0) + 100
                total_points += max(0, q_score) 
                    
    Scores.objects.create(room_id=uid, teamname=teamname, score=int(total_points))

    return JsonResponse({
        "status": "success",
        "your_score": int(total_points),
    }, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def quiz_leaderboard(request, uid):
    try:
        room = Room.objects.get(uid=uid)
        scores = Scores.objects.filter(room=room).order_by('-score', 'timestamp')
        
        leaderboard = [
            {
                "teamname": score.teamname,
                "score": score.score,
                "timestamp": score.timestamp.isoformat() if score.timestamp else None
            } for score in scores
        ]
        return JsonResponse({"leaderboard": leaderboard}, status=200)
    except Room.DoesNotExist:
        return JsonResponse({"error": "Room not found"}, status=404)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_players(request):
    players = [player for player in Player.objects.all()]
    random.seed(42)
    random.shuffle(players)

    return JsonResponse(dict([
        (players[i].uid.hex, {
            'name': players[i].name,
            'is_domestic': players[i].domestic,
            'domain': players[i].domain,
            'prev': None if i == 0 else players[i-1].uid.hex,
            'next': None if i == len(players)-1 else players[i+1].uid.hex,
            'base_price': players[i].base_price,
            'order': players[i].order
        }) for i in range(len(players))
    ]))