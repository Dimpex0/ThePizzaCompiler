from django.contrib import admin
from .models import Pizza, Ingredient

# Register your models here.
@admin.register(Pizza)
class PizzaAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    
@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price']
