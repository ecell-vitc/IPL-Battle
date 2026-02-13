from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from admin.models import Question, Scores, Room
import json


def questions(request, uid):
    if request.method == 'GET':
        questions = Question.objects.filter(room__uid=uid)
        response_data = [
            {
                "uid": str(q.id), 
                "question": q.question,
                "options": [q.optionA, q.optionB, q.optionC, q.optionD] 
            } for q in questions
        ]
        return JsonResponse(response_data, safe=False)

    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            teamname = data.get('teamname')
            team_answers = data.get('answers') 
            total_points = 0
            
            for q_id, response in user_answers.items():
                try:
                    question = Question.objects.get(id=q_id, room__uid=uid)
                    submitted_answer = response.get('answer') 
                    time_taken = float(response.get('time', 12))

                    if question.correct_answer == submitted_answer:
                        q_score = (-100 * time_taken / 12) + 100
                        total_points += max(0, q_score)
                except Question.DoesNotExist:
                    continue
            
            # Save the score
            Scores.objects.create(room_id=uid, teamname=username, score=int(total_points))
   
            leaderboard_data = list(Scores.objects.filter(room_id=uid)
                                    .order_by('-score', 'timestamp') 
                                    .values('teamname', 'score', 'timestamp'))

            return JsonResponse({
                "status": "success",
                "your_score": int(total_points),
                "leaderboard": leaderboard_data
            }, status=200)
                                
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)