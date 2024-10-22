from rest_framework.serializers import ModelSerializer

from .models import Pizza
from ..serializers import IngredientSerializer

class PizzaSerializer(ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    other_ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Pizza
        fields = '__all__'