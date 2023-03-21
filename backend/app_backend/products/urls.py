from django.urls import path
from products.views import getAllProducts, getProduct, getRoutes, createProduct, updateProduct, deleteProduct

urlpatterns = [
    path('', getRoutes, name='routes'),
    path('products/', getAllProducts, name='products'),
    path('product/<str:pk>/', getProduct, name='product'),

    path('manage/product/create/', createProduct, name='product-create'),
    path('manage/product/update/<str:pk>/', updateProduct, name='product-update'),
    path('manage/product/delete/<str:pk>/', deleteProduct, name='product-delete'),
]