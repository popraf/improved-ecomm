# import base.views
from django.urls import path
from .views import MyTokenObtainPairView, getUserProfile, updateUserProfile, userRegister, createOrder


urlpatterns = [
    path('user/profile/', getUserProfile, name='user-profile'),
    path('user/profile/update/', updateUserProfile, name='user-profile-update'),
    path('user/login/', MyTokenObtainPairView.as_view(), name='login-token-obtain'),
    # path('user/users/', getUserProfile, name='all-users'),
    path('user/register/', userRegister, name='user-register'),

    path('order/order-create', createOrder, name='select-order-items'),
]