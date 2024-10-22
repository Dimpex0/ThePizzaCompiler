from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .models import Drink
from .serializers import DrinkSerializer

# Create your views here.
class GETDrinkList(ListAPIView):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer