from django.urls import path
from products.views import getAllProducts, getProduct, getRoutes

urlpatterns = [
    path('', getRoutes, name='routes'),
    path('products/', getAllProducts, name='products'),
    path('product/<str:pk>/', getProduct, name='product'),
]