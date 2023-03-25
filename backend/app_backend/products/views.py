from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product, Review
from products.serializers import ProductSerializer, CreateProductSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'products',
        'product/<str:pk>/',
    ]
    return Response(routes)

# Return all products
@api_view(['GET'])
def getAllProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query).order_by('-createdAt')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# Return a single product specified by primary key
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data

    try:
        product = Product.objects.create(
            user=user,
            name=data['name'],
            image=data['image'],
            price=float(data['price']),
            brand=data['brand'],
            countInStock=int(data['countInStock']),
            category=data['category'],
            description=data['description']
        )
        serializer = CreateProductSerializer(product, many=False)
        return Response(serializer.data)
    
    except Exception as e:
        message = {'detail':'Error while adding new product.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    if data['removeImageFlag']=='true':
        product.image = 'placeholder.png'
    else:
        if type(data['image'])==type(' '): # class str type match
            product.image = data['image'].replace('/images','')
        else:
            product.image = data['image']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')