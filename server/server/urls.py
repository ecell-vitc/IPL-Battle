"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from admin.models import Room
from participant.models import Team
from django.db.models import Sum
from django.http.response import JsonResponse
import uuid

from lib import logic

def get_board(req, id):
    try: room = Room.objects.get(uid=uuid.UUID(id))
    except: return JsonResponse({ 'valid': False, 'message': 'Room not found!' })

    return JsonResponse(logic.get_leaderboard(room))



# from django.contrib import admin
from django.urls import path, re_path, include
from admin import consumers
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('participant/', include('participant.urls')),
    path('auctioneer/', include('auctioneer.urls')),
    path('admin/', include('admin.urls')),
    path('leaderboard/<str:id>/', get_board),
    path('quiz/<uuid:uid>/', views.questions, name='get_questions'),
    path('quiz/<str:uid>/leaderboard/', views.questions, name='quiz_leaderboard')
]

websocket_urlpatterns = [
    re_path(r'room/(?P<room_uid>\w+)/$', consumers.RoomConsumer.as_asgi())
]