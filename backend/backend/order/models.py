from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

# Create your models here.
class Order(models.Model):
    class OrderStatus(models.TextChoices):
        CREATED = 'CREATED', 'Created'
        PAID = 'PAID', 'Paid'
        BAKING = 'BAKING', 'Baking'
        READY_FOR_PICK_UP = 'READY FOR PICK UP', 'Ready for pick up'
        DELIVERING = 'DELIVERING', 'Delivering'
        DELIVERED = 'DELIVERED', 'Delivered'
        
    
    user = models.ForeignKey(
        UserModel,
        on_delete=models.SET_NULL,
        null=True,
        blank=False
    )
    status = models.CharField(
        max_length=255,
        choices=OrderStatus.choices,
        null=False,
        blank=False,
        default='created',
    )
    transaction_id = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=False
    )
    order_code = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=False
    )
    amount = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        default=0.00,
        null=False,
        blank=False,
    )
    items = models.JSONField(
        null=False,
        blank=False,
    )
    first_name = models.CharField(
        max_length=255,
        default='',
        null=False,
        blank=False
    )
    last_name = models.CharField(
        max_length=255,
        default='',
        null=False,
        blank=False
    )
    phone = models.CharField(
        max_length=255,
        default='',
        null=False,
        blank=False
    )
    delivery = models.BooleanField(
        default=False,
        null=False,
        blank=False,
    )
    address = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        null=True,
        blank=True
    )