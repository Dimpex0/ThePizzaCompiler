from django.urls import path

from .views import GETDrinkList

urlpatterns = [
    path('list-drinks/', GETDrinkList.as_view())
]
