from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from .metodos.numeric_method import create_method
import json


#  Create your views here.
def index(request):
    return JsonResponse({"test": "Hello world"})


@csrf_exempt
def call_method(request, method_name):

    try:
        method = create_method(method_name)
        if request.method == "GET":
            return JsonResponse({"Ayuda": method.get_description()})
        else:
            params = body2dict(request)
            response = method.calculate(params)
            return JsonResponse(response)
    except Exception as e:
        return JsonResponse({"Error": "Verifique los datos de entrada"})


def body2dict(request):
    """
    Metodo que recibe un request y devuelve el JSON del body como diccionario
    """

    return json.loads(request.body.decode("UTF-8"))
