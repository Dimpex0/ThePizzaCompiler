from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import status

import requests

from django.shortcuts import redirect

from dotenv import load_dotenv
import os
import base64
import json

from ..order.models import Order
from ..cart.models import Cart

load_dotenv()

TOKEN_CREDENTIALS = f"{os.getenv('VIVA_WALLET_CLIENT_ID', "")}:{os.getenv('VIVA_WALLET_CLIENT_SECRET', '')}"
BASE_VIVA_ACCOUNTS_URL = os.getenv('VIVA_WALLET_ACCOUNTS_URL', '')
BASE_VIVA_API_URL = os.getenv('VIVA_WALLET_API_URL', '')

def get_access_token():
    token_url = f"{BASE_VIVA_ACCOUNTS_URL}/connect/token"
    token_headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        "Authorization": f"Basic {base64.b64encode(TOKEN_CREDENTIALS.encode('ascii')).decode('ascii')}",
    }
    token_data = {
        "grant_type": "client_credentials",
    }
    token_response = requests.post(token_url, headers=token_headers, data=token_data)
    token_json = token_response.json()
    
    return token_json.get('access_token')

# Create your views here.
class CreateOrderCode(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        price = request.data.get('price')
        
        ACCESS_TOKEN = get_access_token()

        create_order_url = f"{BASE_VIVA_API_URL}/checkout/v2/orders"
        create_order_headers = {
            'Content-Type': 'application/json',
            "Authorization": f"Bearer {ACCESS_TOKEN}"
        }
        create_order_data = json.dumps({
            "amount": price,
            "sourceCode": 6181,
            "currencyCode": 975,
        })
        
        create_order_response = requests.post(create_order_url, headers=create_order_headers, data=create_order_data)
        create_order_json = create_order_response.json()
        
        return Response({"orderCode": create_order_json.get('orderCode')}, status=status.HTTP_200_OK)
    

class VerifyTransaction(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        transaction_id = request.data.get('transactionId')
        order_code = request.data.get('orderCode')
        
        ACCESS_TOKEN = get_access_token()

        verify_order_url = f"{BASE_VIVA_API_URL}/checkout/v2/transactions/{transaction_id}"
        verify_order_headers = {
            "Content-Type": 'application/json',
            "Authorization": f"Bearer {ACCESS_TOKEN}"
        }
        verify_order_response = requests.get(verify_order_url, headers=verify_order_headers)
        
        if (verify_order_response.status_code == 200):            
            cart = Cart.objects.get(user=request.user)

            order = Order.objects.get(order_code=order_code)
            order.transaction_id = transaction_id
            order.status = Order.OrderStatus.PAID
            order.save()
            
            cart.delete()
            return Response({"message": 'Order created.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Couldn't verify transaction."}, status=status.HTTP_404_NOT_FOUND)
        
        
class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        amount = request.data.get('amount')
        order_code = request.data.get('orderCode')
        
        cart = Cart.objects.get(user=request.user)
        
        order = Order.objects.create(user=request.user, status=Order.OrderStatus.CREATED, items=cart.items, amount=amount, order_code=order_code)
        return Response({"message": "Order created.", 'orderId': order.pk}, status=status.HTTP_201_CREATED)
        