from django.urls import path
from products.views import getProduct

urlpatterns = [
    path('product/', getProduct, name='products'),
    path('product/<str:pk>/', getProduct, name='products'),
]