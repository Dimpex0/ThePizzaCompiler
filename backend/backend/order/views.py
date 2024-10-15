from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Order
from ..cart.models import Cart

# Create your views here.
class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def post(self, request):
        amount = request.data.get('amount')
        order_code = request.data.get('orderCode')
        delivery = request.data.get('delivery')
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        print(last_name)
        phone = request.data.get('phone')
        address = request.data.get('address')
        print(request.data)
        
        cart = Cart.objects.get(user=request.user)
        
        order = Order.objects.create(
            user=request.user,
            status=Order.OrderStatus.CREATED,
            items=cart.items,
            amount=amount,
            order_code=order_code,
            delivery=delivery,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            address=address if delivery else ""
        )
        return Response({"message": "Order created.", 'orderId': order.pk}, status=status.HTTP_201_CREATED)