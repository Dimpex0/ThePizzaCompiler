from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Cart, PizzaCartItem
from ..product.pizza.serializers import PizzaSerializer
from ..product.serializers import IngredientSerializer

class PizzaCartItemSerializer(ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    type = SerializerMethodField()
    item_id = SerializerMethodField()
    
    class Meta:
        model = PizzaCartItem
        fields = ['image', 'ingredients', 'name', 'price', 'quantity', 'size', 'type', 'item_id']
        
    def get_type(self, obj):
        return 'Pizza'
    
    def get_item_id(self, obj):
        return obj.pizza.id

class CartSerializer(ModelSerializer):
    items = PizzaCartItemSerializer(many=True)
    
    class Meta:
        model = Cart
        fields = "__all__"
        read_only_fields = ['user']