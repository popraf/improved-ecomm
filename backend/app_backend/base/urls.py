# import base.views
from django.urls import path
from .views import MyTokenObtainPairView, getUserProfile, updateUserProfile, userRegister, createOrder, getOrderById, updateOrderToPaid, getOrders, getMyOrders, getAllUsers


urlpatterns = [
    path('user/profile/', getUserProfile, name='user-profile'),
    path('user/profile/update/', updateUserProfile, name='user-profile-update'),
    path('user/login/', MyTokenObtainPairView.as_view(), name='login-token-obtain'),
    path('user/register/', userRegister, name='user-register'),
    path('user/my-orders/', getMyOrders, name='my-orders'),
    
    path('user/orders/', getOrders, name='all-orders'),
    path('user/users/', getAllUsers, name='all-users'),

    path('order/order-create/', createOrder, name='order-create'),
    path('order/<str:pk>/', getOrderById, name='order-details'),
    path('order/<str:pk>/pay/', updateOrderToPaid, name='order-pay'),
]