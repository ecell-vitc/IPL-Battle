from rest_framework.authtoken.models import Token
from admin.models import User, Room
from participant.models import Participant
from auctioneer.models import Auctioneer

def get_user(token: str) -> User | None:
    try: return Token.objects.get(key=token).user
    except: return None


def validate_room(user: User, room: Room) -> bool:
    if (user.is_admin): return True

    if (user.is_auc):
        auctioneer = Auctioneer.objects.get(user=user)
        return auctioneer.room.uid.hex == room.uid.hex
    
    participant = Participant.objects.get(user=user)
    return participant.room.uid.hex == room.uid.hex


def gen_token(username, password, is_auc=False, is_admin=False):
    user = User.objects.filter(username=username, is_auc=is_auc, is_admin=is_admin).first()
    
    if user is None:
        return 404, {
            'valid': False,
            'message': 'Username not found!'
        }
    
    if not user.check_password(password):
        return 401, {
            'valid': False,
            'message': 'Incorrect Password! Please try again'
        }
    
    token = Token.objects.get_or_create(user=user)[0]
    
    if is_admin: return 200, { 'valid': True, 'token': token.key, }
    return 200, {
        'valid': True,
        'token': token.key,
        'room_uid': (
            None if is_admin else (
                Auctioneer.objects.get(user=user).room.uid.hex if is_auc else
                Participant.objects.get(user=user).room.uid.hex
            )
        )
    }



