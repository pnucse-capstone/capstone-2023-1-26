from django.contrib import admin
from django.urls import path, include

from myyl import views

urlpatterns = [
    path('', views.index),
    path('bus1', views.bus1),
    path('bus2', views.bus2),
    path('bus3', views.bus3),
    path('bus4', views.bus4),
    path('admin', views.admin),
    path('admin/bus1', views.admin_bus1),
    path('admin/bus2', views.admin_bus2),
    path('admin/bus3', views.admin_bus3),
    path('admin/bus4', views.admin_bus4)
]
