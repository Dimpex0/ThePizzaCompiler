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

load_dotenv()

TOKEN_CREDENTIALS = f"{os.getenv('VIVA_WALLET_CLIENT_ID', "")}:{os.getenv('VIVA_WALLET_CLIENT_SECRET', '')}"
BASE_VIVA_ACCOUNTS_URL = os.getenv('VIVA_WALLET_ACCOUNTS_URL', '')
BASE_VIVA_API_URL = os.getenv('VIVA_WALLET_API_URL', '')

# Create your views here.
class CreateOrderCode(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        price = request.data.get('price')
        
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
        
        ACCESS_TOKEN = token_json.get('access_token')
        
        create_order_url = f"{BASE_VIVA_API_URL}/checkout/v2/orders"
        create_order_headers = {
            'Content-Type': 'application/json',
            "Authorization": f"Bearer {ACCESS_TOKEN}"
        }
        create_order_data = json.dumps({
            "amount": price,
            "sourceCode": 6181,
        })
        
        create_order_response = requests.post(create_order_url, headers=create_order_headers, data=create_order_data)
        create_order_json = create_order_response.json()
        
        return Response({"orderCode": create_order_json.get('orderCode')}, status=status.HTTP_200_OK)