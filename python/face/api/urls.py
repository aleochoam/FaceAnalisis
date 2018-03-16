from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("busquedas/", views.busquedas, name='invocar_metodo'),
]