from rest_framework import serializers
from django.contrib.auth.models import User
from products.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CreateProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(read_only=True)
    # image_url = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ['product','user','name','price','brand','countInStock','category','description']#,'image_url'

    def get_product(self, obj):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return serializer.data
