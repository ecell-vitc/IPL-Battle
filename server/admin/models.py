from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser
import uuid

# Create your models here.
class User(AbstractBaseUser):
    uid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=256)
    is_auc = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'

    last_login = is_superuser = first_name = last_name = email = is_staff = date_joined = None

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

    def check_password(self, password):
        return check_password(password, self.password)
    

class Player(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=30)
    domestic = models.BooleanField(default=True)
    score = models.IntegerField()

    class DomainChoice(models.TextChoices):
        BATSMAN = 'BA'
        BOWLER = 'BO'
        ALL_ROUNDER = 'AR'
        WICKET_KEEPER = 'WK'

    domain = models.CharField(max_length=2, choices=DomainChoice)
    base_price = models.IntegerField()
    order = models.IntegerField(default=0)

class Room(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, primary_key=True)
    curr_player = models.ForeignKey(to=Player, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=25)

from django.db import models
from admin.models import Room

class Question(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='questions')
    question = models.CharField(max_length=255)
    options = models.JSONField(default=list) 
    correct_answer = models.CharField(max_length=255)

class Scores(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='scores')
    teamname = models.CharField(max_length=30)
    score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)