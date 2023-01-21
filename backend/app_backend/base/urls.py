from django.urls import path
import base.views


urlpatterns = [
    path('', base.views.getRoutes, name='routes'),
]