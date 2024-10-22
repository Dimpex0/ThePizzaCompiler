from django.db import models

from ..models import Product

# Create your models here.
class Drink(Product):
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    image = models.ImageField(
        upload_to='drink'
    )
    price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=0.00,
        null=False,
        blank=False,
    )
    stock = models.PositiveIntegerField(
        default=0,
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.name