from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Pizza
from .serializers import PizzaSerializer

# Create your views here.
class GETPizzaList(ListAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    
class GETPizzaDetails(RetrieveAPIView):
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    lookup_field = 'slug'