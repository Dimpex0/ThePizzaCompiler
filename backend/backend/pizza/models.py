from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class Ingredient(models.Model):
    
    class IngredientType(models.TextChoices):
        DOUGH = 'DOUGH', 'Dough'
        SAUCE = 'SAUCE', 'Sauce'
        CHEESE = 'CHEESE', 'Cheese'
        MEAT = 'MEAT', 'Meat'
        VEGETABLE = 'VEGETABLE', 'Vegetable'
        HERB_SPICE = 'HERB_SPICE', 'Herb & Spice'
        SPECIAL = 'SPECIAL', 'Special'
        ADD_ON = 'ADD_ON', 'Add-On'
    
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    type = models.CharField(
        max_length=100,
        choices=IngredientType.choices,
        null=False,
        blank=False,
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
        return f"{self.name} ({self.type})"

class Pizza(models.Model):
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    image = models.ImageField(
        upload_to='pizza'
    )
    ingredients = models.ManyToManyField(
        'Ingredient',
        related_name='pizzas'
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
    slug = models.SlugField(
        max_length=255,
        null=True,
        blank=True,
        )
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Pizza, self).save(*args, **kwargs)
