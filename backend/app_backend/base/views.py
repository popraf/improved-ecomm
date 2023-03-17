from datetime import datetime
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from .serializers import UserSerializer, TokenRefreshUserSerializer, GetAllUsersSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .models import Order, ShippingAddress, OrderItem
from products.models import Product
from .serializers import OrderSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = TokenRefreshUserSerializer(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username = data['email']

    if len(data['password'])>5:
        user.password = make_password(data['password'])
    
    user.save()
    
    return Response(serializer.data)


@api_view(['POST'])
def userRegister(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = TokenRefreshUserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail':'User with this email already exists.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = User.objects.all
    serializer = GetAllUsersSerializer(users, many=True)
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # Override default validate, which is producing the data with custom one
    def validate(self, attrs):
        data = super().validate(attrs)

        # # Add custom claims - now in the loop
        # data['username'] = self.user.username
        # data['userEmail'] = self.user.email

        serializer = TokenRefreshUserSerializer(self.user).data

        for key, value in serializer.items():
            data[key] = value

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    # View that handles our custom token serializer - serializer_class set
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createOrder(request):
    """
    If order is correct: 
        1. Create order, 
        2. Create shipping address, 
        3. Create order items and set order to orderItem association 
        4. Update stock
    """
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    shippingAddress = data['shippingAddress']['shippingAddress']

    if orderItems and len(orderItems)==0:
        message = {'detail':'Please select order items.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod']['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        shipping_address = ShippingAddress.objects.create(
            order = order,
            address = shippingAddress['shipAddress'],
            city = shippingAddress['shipCity'],
            postalCode = shippingAddress['shipPostCode'],
            country = shippingAddress['shipCountry'],
        )

        for item in orderItems:
            _product = Product.objects.get(_id = item['product'])
            order_item = OrderItem.objects.create(
                product = _product,
                order = order,
                name = _product.name,
                qty = item['qty'],
                price = item['price'],
                image = _product.image.url, # TODO: If no img, should use default one in model
            )

            _product.countInStock -= int(item['qty'])
            _product.save()
            
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered')

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)