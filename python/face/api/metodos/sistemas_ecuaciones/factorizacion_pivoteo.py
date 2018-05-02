import numpy as np

from ..numeric_method import NumericMethod
from .matrix_utils import sustitucion_regresiva, sustitucion_progresiva
from .matrix_utils import intercambiar_filas
from .matrix_utils import no_es_invertible, process_params


class FactorizacionPivoteo(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A, b = process_params(A, b)
        response = self.init_response()

        if no_es_invertible(A):
            response["error"] = "La matriz no es invertible"
            return response

        U, L, P = factorizar(A)
        Bn = np.matmul(P, b.T)

        z = sustitucion_progresiva(L, Bn.T)
        x = sustitucion_regresiva(U, z)

        L = np.round(L, 2)
        U = np.round(U, 2)

        response["L"] = str(L)
        response["U"] = str(U)
        response["z"] = str(z)
        response["x"] = str(x)

        return response

    def get_description(self):
        return "Retorna una matriz escalonada de acuerdo con una matriz A y un vector b"

    def init_response(self):
        response = dict()

        return response


def factorizar(A):
    n = len(A)
    P = np.identity(n)
    L = np.zeros((n, n))

    for k in range(0, n):
        A, P, L = pivoteo(A, P, L, k)
        for i in range(k+1, n):
            mult = A[i, k]/A[k, k]
            if i > k:
                L[i][k] = mult
            for j in range(k, n):
                A[i, j] = A[i, j] - mult * A[k, j]

    for i in range(n):
        L[i, i] = 1

    return A, L, P


def pivoteo(A, P, L, k):
    n = len(A)
    mayor = abs(A[k, k])
    fila_mayor = k

    for s in range(k+1, n):
        if abs(A[s, k]) > mayor:
            mayor = abs(A[s, k])
            fila_mayor = s
    if mayor == 0:
        raise Exception("El sistema no tiene solución")
    else:
        if fila_mayor != k:
            A = intercambiar_filas(A, fila_mayor, k)
            P = intercambiar_filas(P, fila_mayor, k)
            L = intercambiar_filas(L, fila_mayor, k)
        return A, P, L
