from django.db import models

from django.utils.text import slugify

# Create your models here.
class Drink(models.Model):
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
    slug = models.SlugField(
        max_length=255,
        null=True,
        blank=True,
        )

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Drink, self).save(*args, **kwargs)