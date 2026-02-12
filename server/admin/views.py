from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny

from django.http.response import HttpResponseBadRequest, JsonResponse
from lib.auth import gen_token
from lib.utils import get_fields

from admin.models import Room

@api_view(['POST'])
@permission_classes([AllowAny])
def login(req):
    valid, data = get_fields(req.data, ['username', 'password'])
    if not valid: HttpResponseBadRequest()
    
    status, res = gen_token(data['username'], data['password'], is_admin=True)
    return JsonResponse(res, status=status)


@api_view(['GET'])
def get_rooms(req):
    if not req.user.is_admin: return JsonResponse({}, status=403)
    return JsonResponse({
        'rooms': [{
            'uid': room.uid.hex,
            'name': room.name
        } for room in Room.objects.all()]
    })