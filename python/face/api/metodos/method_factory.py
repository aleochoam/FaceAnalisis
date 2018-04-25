from .numeric_method import NumericMethod

from .ecuaciones_no_lineales.metodo_biseccion import Bisection
from .ecuaciones_no_lineales.metodo_busquedas import IncrementalSearch
from .ecuaciones_no_lineales.metodo_regla_falsa import FalsePosition
from .ecuaciones_no_lineales.metodo_punto_fijo import FixedPoint
from .ecuaciones_no_lineales.metodo_newton import NewtonMethod
from .ecuaciones_no_lineales.metodo_newton_m import Newton2Method
from .ecuaciones_no_lineales.metodo_secante import Secante

from .sistemas_ecuaciones.eliminacion_simple import EliminacionSimple


def create_method(method):
    # Capitulo ecuaciones no lineales
    if method == "busquedas":
        return IncrementalSearch()
    elif method == "biseccion":
        return Bisection()
    elif method == "regla_falsa":
        return FalsePosition()
    elif method == "punto_fijo":
        return FixedPoint()
    elif method == "newton":
        return NewtonMethod()
    elif method == "newton2":
        return Newton2Method()
    elif method == "secante":
        return Secante()

    # Capitulo sistemas de ecuaciones
    elif method == "eliminacion_simple":
        return EliminacionSimple()
    else:
        return NumericMethod()
