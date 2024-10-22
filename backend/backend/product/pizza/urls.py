from django.urls import path

from .views import GETPizzaList, GETPizzaDetails

urlpatterns = [
    path('list-pizzas/', GETPizzaList.as_view()),
    path('details-pizza/<slug>/', GETPizzaDetails.as_view()),
]
