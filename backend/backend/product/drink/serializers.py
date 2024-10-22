from rest_framework.serializers import ModelSerializer

from .models import Drink

class DrinkSerializer(ModelSerializer):
    class Meta:
        model = Drink
        fields = "__all__"