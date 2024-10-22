from django.contrib import admin
from .models import Pizza

# Register your models here.
@admin.register(Pizza)
class PizzaAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    readonly_fields = ['slug']
