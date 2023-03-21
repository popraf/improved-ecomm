from django.db.models.signals import pre_save
from .models import Product

# def updateImage(sender, instance, **kwargs):
#     """
#     Resize image.
#     """
#     product = instance


# pre_save.connect(updateImage, sender=Product)