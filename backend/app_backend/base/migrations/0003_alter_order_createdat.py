# Generated by Django 4.1.5 on 2023-03-20 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_order_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
