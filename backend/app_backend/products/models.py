from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False) # set null - if user is deleted, then the products stays in shop; however, this is not the case within our marketplace
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=1500, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(default=0, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    isAccepted = models.BooleanField(default=False, blank=False, null=False) # if is accepted by moderator
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(default=5, null=True, blank=True)
    comment = models.TextField(max_length=500, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
