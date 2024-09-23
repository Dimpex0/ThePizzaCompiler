from django.urls import path

from .views import GETPizzaList

urlpatterns = [
    path('list-pizza/', GETPizzaList.as_view()),
]
