from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("<str:method_name>/", views.call_method, name='invocar_metodo'),
]
