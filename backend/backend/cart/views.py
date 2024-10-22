from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Cart, PizzaCartItem
from .serializers import CartSerializer

# Create your views here.

class GETCart(RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def get_object(self):
        return get_object_or_404(Cart, user=self.request.user)

class UPDATECartItems(RetrieveUpdateAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]
    
    def get_object(self):
        # Retrieve the cart for the logged-in user, or create one if none exists
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart
    
    def update(self, request, *args, **kwargs):
        cart = self.get_object()

        items_data = request.data.get('items', None)
        if items_data is None:
            return Response({"message": "Items field is required."}, status=status.HTTP_400_BAD_REQUEST)

        for item in items_data:
            if item['type'] == 'Pizza':
                pass
                
        
        try:
            cart.items = items_data
            cart.save()   
        except Exception:
            return Response({'message': "Couldn't save cart."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
def add_pizza_item_to_cart(cart, item):
    # obj, created = PizzaCartItem.objects.get_or_create(
        
    # )
    pass