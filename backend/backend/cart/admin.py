from django.contrib import admin
from .models import Cart, PizzaCartItem

# Register your models here.
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user']
    
@admin.register(PizzaCartItem)
class CartAdmin(admin.ModelAdmin):
    list_display = ['cart', 'price', 'quantity']
