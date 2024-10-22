from django.contrib import admin

from .models import Ingredient

# Register your models here.
@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'price']
    readonly_fields = ['edit_type']