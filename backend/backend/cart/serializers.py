from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Cart, PizzaCartItem
from ..product.pizza.serializers import PizzaSerializer
from ..product.serializers import IngredientSerializer

class PizzaCartItemSerializer(ModelSerializer):
    pizza = PizzaSerializer()
    ingredients = IngredientSerializer(many=True)
    type = SerializerMethodField()
    
    class Meta:
        model = PizzaCartItem
        fields = '__all__'
        
    def get_type(self, obj):
        return 'Pizza'

class CartSerializer(ModelSerializer):
    items = PizzaCartItemSerializer(many=True)
    
    class Meta:
        model = Cart
        fields = "__all__"
        read_only_fields = ['user']