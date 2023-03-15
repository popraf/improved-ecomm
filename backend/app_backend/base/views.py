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

    orderItems = data['userCartItems']

    if orderItems and len(orderItems)==0:
        message = {'detail':'Please select order items.'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
            # isPaid = data['paymentMethod'],
            # paidAt = data['paymentMethod'],
            # isDelivered = data['paymentMethod'],
            # deliveredAt = data['paymentMethod']
        )
        shipping_address = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['shipAddress'],
            city = data['shippingAddress']['shipCity'],
            postalCode = data['shippingAddress']['shipPostCode'],
            country = data['shippingAddress']['shipCountry'],
            # {"shipCountry":"adasd","shipCity":"gerger","shipPostCode":"wefwef","shipAddress":"ef"}
            # order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
            # address = models.CharField(max_length=200, null=True, blank=True)
            # city = models.CharField(max_length=200, null=True, blank=True)
            # postalCode = models.CharField(max_length=200, null=True, blank=True)
            # country = models.CharField(max_length=200, null=True, blank=True)
            # shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
        )

        for orderItem in orderItems:
            _product = Product.objects.get(_id = orderItem['product'])
            order_item = OrderItem.objects.create(
                product = _product,
                order = order,
                name = _product.name,
                qty = orderItem['qty'],
                price = orderItem['price'],
                image = _product.image.url,
                    # product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
                    # order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
                    # name = models.CharField(max_length=200, null=True, blank=True)
                    # qty = models.IntegerField(default=1, null=True, blank=True)
                    # price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
                    # image = models.CharField(max_length=200, null=True, blank=True)
            )
            _product.countInStock -= orderItem['qty']
            _product.save()
            
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)

        # dispatch(createOrderAction({
        #     orderItems: cart.userCartItems,
        #     shippingAddress: orderShippingAddress,
        #     paymentMethod: orderPaymentMethod,
        #     itemsPrice: cart.itemsPrice,
        #     shippingPrice: cart.shippingPrice,
        #     taxPrice: cart.taxPrice,
        #     totalPrice: cart.totalPrice,
        # }))
        
    # if len(data['password'])>5:
    #     user.password = make_password(data['password'])
    # user.save()
    # return Response()
