from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    # Instead of editing the default django user, Ive written a signal that fires off once user is created
    # and changes the username with email.
    user = instance
    if len(user.email)>0:
        user.username = user.email

pre_save.connect(updateUser, sender=User)