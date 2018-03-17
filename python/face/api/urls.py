from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("busquedas/", views.call_busquedas, name='invocar_metodo'),
    path("biseccion/", views.call_biseccion, name='invocar_metodo'),
    path("regla_falsa/", views.call_regla_falsa, name='invocar_metodo'),
]
