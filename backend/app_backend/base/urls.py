# import base.views
from django.urls import path
from .views import MyTokenObtainPairView, getUserProfile, getUserProfile, userRegister


urlpatterns = [
    path('user/profile/', getUserProfile, name='user-profile'),
    path('user/login/', MyTokenObtainPairView.as_view(), name='login-token-obtain'),
    path('user/users/', getUserProfile, name='all-users'),
    path('user/register/', userRegister, name='user-register')
]