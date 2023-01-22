from django.urls import path
from products.views import getAllProducts, getProduct

urlpatterns = [
    path('products/', getAllProducts, name='products'),
    path('product/<str:pk>/', getProduct, name='product'),
]