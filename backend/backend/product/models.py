from django.db import models
from django.utils.text import slugify


class Product(models.Model):
    class Meta:
        abstract = True
        
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    is_available = models.BooleanField(
        default=True
    )
    slug = models.SlugField(
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    

class Ingredient(models.Model):
    
    class IngredientType(models.TextChoices):
        DOUGH = 'DOUGH', 'Dough'
        SAUCE = 'SAUCE', 'Sauce'
        CHEESE = 'CHEESE', 'Cheese'
        MEAT = 'MEAT', 'Meat'
        VEGETABLE = 'VEGETABLE', 'Vegetable'
        HERB_SPICE = 'HERB_SPICE', 'Herb & Spice'
        SPECIAL = 'SPECIAL', 'Special'
        ADD_ON = 'ADD ON', 'Add on'
        
    class EditType(models.TextChoices):
        ADD = 'ADD', 'Add'
        CHANGE = 'CHANGE', 'Change'
    
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
    edit_type = models.CharField(
        max_length=100,
        choices=EditType.choices,
        null=True,
        blank=True,
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1.00,
        null=False,
        blank=False,
    )
    stock = models.PositiveIntegerField(
        default=1,
        null=False,
        blank=False,
    )
    
    def save(self, *args, **kwargs):
        # Set edit_type based on the ingredient type
        if self.type in (self.IngredientType.DOUGH, self.IngredientType.SAUCE):
            self.edit_type = self.EditType.CHANGE
        else:
            self.edit_type = self.EditType.ADD
        
        super(Ingredient, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} ({self.type})"