from django.urls import path, include

urlpatterns = [
    path('pizza/', include('backend.product.pizza.urls')),
    path('drink/', include('backend.product.drink.urls')),
]
