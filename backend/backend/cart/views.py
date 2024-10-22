from rest_framework.generics import RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Cart, PizzaCartItem
from ..product.models import Ingredient
from ..product.pizza.models import Pizza
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
        try:
            cart = self.get_object()

            # If request data is invalid, return error
            items_data = request.data.get('items', None)
            if items_data is None:
                return Response({"message": "Items field is required."}, status=status.HTTP_400_BAD_REQUEST)
            
            # If request data item are empty, delete all items from the cart and return response
            if items_data == []:
                for cart_item in cart.items.all():
                    cart_item.delete()
                return Response({"message": 'Updated cart.'}, status=status.HTTP_200_OK)

            # Loop thru request items and update them
            for item in items_data:
                if item.get('type') == 'Pizza':
                    add_pizza_item_to_cart(cart, item)
                    
            # Check for deleted items and delete them from the DB
            # cart_items = cart.items.all()
            # cart_items_to_remove = []
            # if len(cart_items) > len(items_data):                
            #     for cart_item in cart.items.all():
            #         exists_in_items_data = False
            #         for item in items_data:
            #             print(cart_item.pizza.id)
            #             print(item.get('item_id'))
            #             print(cart_item.name)
            #             print(item.get('name'))
            #             if item.get('item_id') == cart_item.pizza.id and item.get('name') == cart_item.name:
            #                 print('exists')
            #                 exists_in_items_data = True
                            
            #         if not exists_in_items_data:
            #             cart_items_to_remove.append(cart_item)
                
            #     for cart_item in cart_items_to_remove:
            #         print('deleted')
            #         cart_item.delete()
            
            # TODO: When removing items on the frontend, they are not removed from the DB
        
        except Exception as e:
            print(e)
            return Response({'message': "Couldn't save cart."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = self.get_serializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
def add_pizza_item_to_cart(cart, item):
    pizza_id = item.get('item_id')
    name = item.get('name')
    size = item.get('size')
    price = item.get('price')
    image = item.get('image')
    quantity = item.get('quantity')
    
    pizza_ingredients = []
    for ingredient in item.get('ingredients'):
        pizza_ingredient = Ingredient.objects.get(id=ingredient.get('id'))
        pizza_ingredients.append(pizza_ingredient)
    pizza_ingredients = set(pizza_ingredients)
        
    try:
        cart_item = PizzaCartItem.objects.get(cart=cart, name=name, size=size, price=price, image=image)
        cart_item_ingredients = set(cart_item.ingredients.all())

        if (cart_item_ingredients == pizza_ingredients):
            cart_item.quantity = item.get('quantity')
            cart_item.save()
            
    except Exception:
        pizza = Pizza.objects.get(id=pizza_id)
        cart_item = PizzaCartItem.objects.create(cart=cart, name=name, size=size, price=price, image=image, quantity=quantity, pizza=pizza)
        for ingredient in pizza_ingredients:
            cart_item.ingredients.add(ingredient)
        cart_item.save()