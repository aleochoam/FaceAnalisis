from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .metodos.metodo_busquedas import descripcion, calcular_busquedas
import json


#  Create your views here.
def index(request):
    return JsonResponse({"test": "Hello world"})


@csrf_exempt
def busquedas(request):
    if request.method == "GET":
        return JsonResponse({"Ayuda": descripcion()})
    else:
        params = body2dict(request)
        response = calcular_busquedas(params)
        return JsonResponse(response)


def biseccion(request):
    pass


def regla_falsa(request):
    pass


def punto_fijo(request):
    pass


def newton(request):
    pass


def body2dict(request):
    """
    Metodo que recibe un request y devuelve el JSON del body como diccionario
    """

    return json.loads(request.body.decode("UTF-8"))
