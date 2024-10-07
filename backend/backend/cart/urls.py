from django.urls import path
from .views import UPDATECartItems, GETCart

urlpatterns = [
    path('update-items/', UPDATECartItems.as_view()),
    path('get-cart/', GETCart.as_view()),
]
