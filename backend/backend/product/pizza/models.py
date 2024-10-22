from django.db import models
from django.contrib.auth import get_user_model

from ..models import Product

UserModel = get_user_model()

class Pizza(Product):
    image = models.ImageField(
        upload_to='product/pizza',
        null=False,
        blank=False,
    )
    ingredients = models.ManyToManyField(
        'product.Ingredient',
        related_name='pizzas'
    )
    other_ingredients = models.ManyToManyField(
        'product.Ingredient',
        blank=True,
    )
    small_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=7.99,
        null=False,
        blank=False,
    )
    medium_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=10.99,
        null=False,
        blank=False,
    )
    large_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=15.99,
        null=False,
        blank=False,
    )
    price = None
    
    def save(self, *args, **kwargs):
        super(Pizza, self).save(*args, **kwargs)
        
        # Loop through the ingredients
        to_remove = []
        for ingredient in self.ingredients.all():
            if ingredient in self.other_ingredients.all():
                print('Removing ingredient:', ingredient)
                to_remove.append(ingredient)
        
        # Remove the ingredients outside the loop to avoid mutating while iterating
        if to_remove:
            self.other_ingredients.remove(*to_remove)
        
        
            
        super(Pizza, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
