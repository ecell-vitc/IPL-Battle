from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny

from django.http.response import HttpResponseBadRequest, JsonResponse
from lib.auth import gen_token
from lib.utils import get_fields

@api_view(['POST'])
@permission_classes([AllowAny])
def login(req):
    valid, data = get_fields(req.data, ['username', 'password'])
    if not valid: HttpResponseBadRequest()
    
    status, res = gen_token(data['username'], data['password'], is_auc=True)
    return JsonResponse(res, status=status)