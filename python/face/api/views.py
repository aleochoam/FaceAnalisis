from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from sympy import SympifyError

from .metodos.method_factory import create_method
from .metodos.ecuaciones_no_lineales.utils import call_eval_f
from .metodos.ecuaciones_no_lineales.utils import plot_f
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
            # print("PARAMS ", params)
            response = method.calculate(params)
            # print("RESPONSE: ", response)
            return JsonResponse(response)
    except SympifyError as e:
        return JsonResponse({"error": "Verifique los datos de entrada"})
    except KeyError as e:
        return JsonResponse({"error": e})
    # except Exception as e:
        # print(e)
        # return JsonResponse({"error": str(e)})


@csrf_exempt
def eval_function(request):
    params = body2dict(request)
    response = call_eval_f(params)
    return JsonResponse(response)


@csrf_exempt
def plot(request):
    params = body2dict(request)
    response = plot_f(params)
    return JsonResponse(response)


def body2dict(request):
    """
    Metodo que recibe un request y devuelve el JSON del body como diccionario
    """

    return json.loads(request.body.decode("UTF-8"))
