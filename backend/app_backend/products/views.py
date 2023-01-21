from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getProduct(request, pk):
    product = None
    for i in product:
        if i['_id']==pk:
            product = i
            break

    product='1'
    return Response(product)