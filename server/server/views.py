from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from admin.models import Question, Scores, Room
import json

@csrf_exempt
def questions(request, uid):
    if request.method == 'GET':
        questions = Question.objects.filter(room__uid=uid)
        response_data = [
            {
                "room_name": q.room.name,
                "uid": str(q.id), 
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

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            teamname = data.get('teamname')
            options_chosen = data.get('optionsChosen', [])
            
            total_points = 0
            
            room_questions = {
                str(q.id): q for q in Question.objects.filter(room__uid=uid)
            }
            
            for entry in options_chosen:
                try:
                    q_id = str(entry.get('questionId'))
                    submitted_option = entry.get('option')
                    time_taken = float(entry.get('timeTaken', 12))

                    if q_id in room_questions:
                        question = room_questions[q_id]
                        if question.correct_answer == submitted_option:
                            q_score = (-100 * time_taken / 12.0) + 100
                            total_points += max(0, q_score) 
                            
                except (ValueError, TypeError):
                    continue
       
            Scores.objects.create(room_id=uid, teamname=teamname, score=int(total_points))

            return JsonResponse({
                "status": "success",
                "your_score": int(total_points),
            }, status=200)
                                
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def quiz_leaderboard(request, uid):
    if request.method == 'GET':
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

    return JsonResponse({"error": "Method not allowed"}, status=405)