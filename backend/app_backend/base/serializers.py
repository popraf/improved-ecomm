from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email','id', 'name', 'isAdmin']

    def get_name(self, obj):
        name = obj.first_name

        if len(name)<1:
            name='Not Specified'

        return name
    
    def get_isAdmin(self, obj):
        return obj.is_staff
    

class TokenRefreshUserSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email','id', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        return str(RefreshToken.for_user(obj).access_token)
    
class GetAllUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
