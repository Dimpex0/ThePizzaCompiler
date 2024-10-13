from django.urls import path

from .views import CreateOrderCode

urlpatterns = [
    path('create-viva-order/', CreateOrderCode.as_view())
]
