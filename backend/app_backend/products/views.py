from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from products.models import Product
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
    products = Product.objects.all()
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
    # print('---- REQ USER:', user)
    # print('---- PRODUCT VIEWS//OBTAINED DATA: ', data)

    try:
        print('image get: ', data['image'])
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
        # print('serialized')
        return Response(serializer.data)
    
    except Exception as e:
        # print('exception', e)
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
