from rest_framework.authtoken.models import Token
from admin.models import User, Room
from participant.models import Participant
from auctioneer.models import Auctioneer

def get_user(headers: dict) -> User | None:
    try:
        token = headers[b'authorization'].split()[1].decode("utf-8")
        return Token.objects.get(key=token).user
    except: return None


def validate_room(user: User, room_uid: str) -> bool:
    if (user.is_admin): return True

    if (user.is_auc):
        auctioneer = Auctioneer.objects.get(user=user)
        return auctioneer.room.uid.hex == room_uid
    
    participant = Participant.objects.get(user=user)
    return participant.room.uid.hex == room_uid


def gen_token(username, password, is_auc=False, is_admin=False):
    user = User.objects.filter(username=username, is_auc=is_auc, is_admin=is_admin)
    
    if len(user) == 0:
        return 404, {
            'valid': False,
            'message': 'Username not found!'
        }
    
    if not user[0].check_password(password):
        return 401, {
            'valid': False,
            'message': 'Incorrect Password! Please try again'
        }
    
    token = Token.objects.get_or_create(user=user[0])[0]
    
    if is_admin: return 200, { 'valid': True, 'token': token.key, }
    return 200, {
        'valid': True,
        'token': token.key,
        'room_uid': (
            Auctioneer.objects.get(user=user[0]).room.uid.hex if is_auc else
            Participant.objects.get(user=user[0]).room.uid.hex
        )
    }



