from rest_framework import serializers
from django.contrib.auth.models import User
from products.models import Product, Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class CreateProductSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Product
        fields = ['product','user','name','price','brand','countInStock','category','description', 'image']#,'image_url'

    def get_product(self, obj):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return serializer.data

    def get_image(self, obj):
        images = obj.image
        serializer = ProductSerializer(images, many=True)
        return serializer.data
