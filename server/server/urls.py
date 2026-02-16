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


# from django.contrib import admin
from django.urls import path, re_path, include
from admin import consumers
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('participant/', include('participant.urls')),
    path('auctioneer/', include('auctioneer.urls')),
    path('admin/', include('admin.urls')),
    path('players/', views.get_players, name='get_players'),
    path('leaderboard/<str:id>/', views.get_board),
    path('quiz/<str:uid>/', views.questions, name='get_questions'),
    path('quiz/<str:uid>/leaderboard/', views.quiz_leaderboard, name='quiz_leaderboard')
]

websocket_urlpatterns = [
    re_path(r'room/(?P<room_uid>\w+)/$', consumers.RoomConsumer.as_asgi())
]