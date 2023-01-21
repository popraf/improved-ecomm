from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getProduct(request, pk):
    # product = None
    for i in Product:
        if i['_id']==pk:
            Product = i
            break
    return Response(Product)