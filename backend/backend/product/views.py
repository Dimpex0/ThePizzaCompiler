from rest_framework.generics import ListAPIView

from .models import Pizza
from .serializers import PizzaSerializer

# Create your views here.
class GETPizzaList(ListAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer