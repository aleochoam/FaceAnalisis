from .metodo_biseccion import Bisection
from .metodo_busquedas import IncrementalSearch
from .metodo_regla_falsa import FalsePosition


class NumericMethod(object):
    """Clase base de los metodos numericos"""

    def calculate(self, parameters):
        return {"Error": "Metodo no implementado"}

    def get_description(self):
        return {"Error": "Metodo no implementado"}


def create_method(method):
    if method == "busquedas":
        return IncrementalSearch()
    elif method == "biseccion":
        return Bisection()
    elif method == "regla_falsa":
        return FalsePosition()
    else:
        return NumericMethod()
