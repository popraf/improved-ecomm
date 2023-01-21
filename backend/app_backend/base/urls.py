import base.views
from django.urls import path


urlpatterns = [
    path('', base.views.getRoutes, name='routes'),
]