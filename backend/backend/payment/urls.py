from django.urls import path

from .views import CreateOrderCode, VerifyTransaction

urlpatterns = [
    path('create-viva-order/', CreateOrderCode.as_view()),
    path('verify-transaction/', VerifyTransaction.as_view()),
]
