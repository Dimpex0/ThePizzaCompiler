from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout


class LoginAPI(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    
    def post(self, request):
        email = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request=request, username=email, password=password)
        
        if user is not None:
            if not user.is_active:
                return Response({'message': 'Account not activated. Please check your e-mail.'}, status=428)
            
            is_admin = login_and_return_user(request, user)

            return Response({'message': 'Login successful.', 'isAdmin': is_admin}, status=202)
        else:
            return Response({'message': 'Wrong credentials.'}, status=400)
        
def login_and_return_user(request, user):
    login(request, user)
    is_admin = user.is_superuser
    return is_admin
