from rest_framework import serializers
from django.contrib.auth.models import User
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CreateProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ['user','name','image_url','price','brand','countInStock','category','description']

# class OrderSerializer(serializers.ModelSerializer):
#     orderItems = serializers.SerializerMethodField(read_only=True)
#     shippingAddress = serializers.SerializerMethodField(read_only=True)
#     user = serializers.SerializerMethodField(read_only=True)
    
#     class Meta:
#         model = Order
#         fields = '__all__'
        # fields = ['username', 'email','id', 'name', 'isAdmin', 'token']

