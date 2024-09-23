from rest_framework.serializers import ModelSerializer

from .models import Pizza, Ingredient

class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class PizzaSerializer(ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Pizza
        fields = '__all__'