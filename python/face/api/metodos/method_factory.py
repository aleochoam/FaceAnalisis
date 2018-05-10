from .numeric_method import NumericMethod

from .ecuaciones_no_lineales.metodo_biseccion import Bisection
from .ecuaciones_no_lineales.metodo_busquedas import IncrementalSearch
from .ecuaciones_no_lineales.metodo_regla_falsa import FalsePosition
from .ecuaciones_no_lineales.metodo_punto_fijo import FixedPoint
from .ecuaciones_no_lineales.metodo_newton import NewtonMethod
from .ecuaciones_no_lineales.metodo_newton_m import Newton2Method
from .ecuaciones_no_lineales.metodo_secante import Secante

from .sistemas_ecuaciones.eliminacion_simple import EliminacionSimple
from .sistemas_ecuaciones.eliminacion_p_parcial import EliminacionPivoteoParcial
from .sistemas_ecuaciones.eliminacion_p_total import EliminacionPivoteoTotal
from .sistemas_ecuaciones.factorizacion_gaussiana import FactorizacionGaussiana
from .sistemas_ecuaciones.factorizacion_pivoteo import FactorizacionPivoteo
from .sistemas_ecuaciones.crout import FactorizacionCrout
from .sistemas_ecuaciones.doolittle import FactorizacionDoolittle
from .sistemas_ecuaciones.cholesky import FactorizacionCholesky
from .sistemas_ecuaciones.jacobi import Jacobi
from .sistemas_ecuaciones.seidel import Seidel
from .sistemas_ecuaciones.sor import SOR

from .interpolacion.sistema_ecuaciones import MetodoSistemaEcuaciones
from .interpolacion.newton_diferencias import NewtonDiferenciasDivididas
from .interpolacion.spline_lineal import SplinesLineales


def create_method(method):
    method = method.lower()
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
    elif method == "eliminacion_piv_parcial":
        return EliminacionPivoteoParcial()
    elif method == "eliminacion_piv_total":
        return EliminacionPivoteoTotal()

    elif method == "factorizacion_simple":
        return FactorizacionGaussiana()
    elif method == "factorizacion_pivoteo":
        return FactorizacionPivoteo()
    elif method == "doolittle":
        return FactorizacionDoolittle()
    elif method == "crout":
        return FactorizacionCrout()
    elif method == "cholesky":
        return FactorizacionCholesky()
    elif method == "jacobi":
        return Jacobi()
    elif method == "seidel":
        return Seidel()
    elif method == "sor":
        return SOR()

    # Capitulo de interpolacion
    elif method == "interpolacion_ecuaciones":
        return MetodoSistemaEcuaciones()
    elif method == "newton_diferencias":
        return NewtonDiferenciasDivididas()
    elif method == "spline_lineal":
        return SplinesLineales()
    else:
        return NumericMethod()
