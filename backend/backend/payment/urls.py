from django.urls import path

from .views import CreateOrderCode, VerifyTransaction, CreateOrder

urlpatterns = [
    path('create-viva-order/', CreateOrderCode.as_view()),
    path('verify-transaction/', VerifyTransaction.as_view()),
    path('create-order/', CreateOrder.as_view()),
]
