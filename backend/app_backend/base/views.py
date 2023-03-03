from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from .serializers import UserSerializer, TokenRefreshUserSerializer, GetAllUsersSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all
    serializer = GetAllUsersSerializer(users, many=True)
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Override default validate, which is producing the data with custom one
    def validate(self, attrs):
        data = super().validate(attrs)

        # # Add custom claims - now in the loop
        # data['username'] = self.user.username
        # data['userEmail'] = self.user.email

        serializer = TokenRefreshUserSerializer(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    # View that handles our custom token serializer - serializer_class set
    serializer_class = MyTokenObtainPairSerializer