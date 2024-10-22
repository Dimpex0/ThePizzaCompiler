from django.db import models
from django.contrib.auth import get_user_model

from ..product.pizza.models import Pizza

UserModel = get_user_model()

# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    
    def __str__(self):
        return self.user.username
    
class CartItem(models.Model):
    class Meta:
        abstract = True
              
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items',
        null=False,
        blank=False,
    )    
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )  
    image = models.URLField(
        null=False,
        blank=False,
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    quantity = models.PositiveIntegerField(
        default=1,
        null=False,
        blank=False
    )
    
class PizzaCartItem(CartItem):
    pizza = models.ForeignKey(
        Pizza,
        on_delete=models.CASCADE,
        related_name='items',
        null=False,
        blank=False,
    )
    ingredients = models.ManyToManyField(
        'product.Ingredient',
    )
    size = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )