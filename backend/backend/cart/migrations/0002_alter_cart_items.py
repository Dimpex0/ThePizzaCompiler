# Generated by Django 5.1.1 on 2024-10-07 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='items',
            field=models.JSONField(blank=True, null=True),
        ),
    ]