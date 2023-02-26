import base.views
from django.urls import path


urlpatterns = [
    path('api', base.views.getRoutes, name='routes'),
]