from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .metodos.metodo_busquedas import descripcion_busquedas, incremental_search
from .metodos.metodo_biseccion import descripcion_biseccion, biseccion
from .metodos.metodo_regla_falsa import descripcion_regla_falsa, regla_falsa
import json


#  Create your views here.
def index(request):
    return JsonResponse({"test": "Hello world"})


@csrf_exempt
def call_busquedas(request):
    if request.method == "GET":
        return JsonResponse({"Ayuda": descripcion_busquedas()})
    else:
        params = body2dict(request)
        response = incremental_search(params)
        return JsonResponse(response)


@csrf_exempt
def call_biseccion(request):
    if request.method == "GET":
        return JsonResponse({"Ayuda": descripcion_biseccion()})
    else:
        params = body2dict(request)
        response = biseccion(params)
        return JsonResponse(response)


@csrf_exempt
def call_regla_falsa(request):
    if request.method == "GET":
        return JsonResponse({"Ayuda": descripcion_regla_falsa()})
    else:
        params = body2dict(request)
        response = regla_falsa(params)
        return JsonResponse(response)


def punto_fijo(request):
    pass


def newton(request):
    pass


def body2dict(request):
    """
    Metodo que recibe un request y devuelve el JSON del body como diccionario
    """

    return json.loads(request.body.decode("UTF-8"))
