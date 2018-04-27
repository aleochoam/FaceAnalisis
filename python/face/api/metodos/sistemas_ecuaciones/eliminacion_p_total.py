import numpy as np

from ..numeric_method import NumericMethod
from .matrix_utils import intercambiar_cols
from .matrix_utils import intercambiar_filas
from .matrix_utils import intercambiar_marcas
from .matrix_utils import concatenar
from .matrix_utils import sustitucion_regresiva
from .matrix_utils import no_es_invertible


class EliminacionPivoteoTotal(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A = np.matrix(eval(A), dtype="float32")
        b = np.matrix(eval(b), dtype="float32")

        response = self.init_response()

        if no_es_invertible(A):
            response["error"] = "La matriz no es invertible"
            return response

        augmented, marcas = eliminacion(A, b)
        augmented = np.round(augmented, 2)

        A = np.delete(augmented.copy(), len(augmented), 1)
        b = augmented[:, len(augmented)]

        x = sustitucion_regresiva(A, b)
        x = organizar_marcas(x,  marcas)

        response["augmented"] = str(augmented)
        response["x"] = str(x)

        return response

    def get_description(self):
        return "Retorna una matriz escalonada de acuerdo con una matriz A y un vector b"

    def init_response(self):
        response = dict()

        return response


def eliminacion(A, b):
    augmented = concatenar(A, b)

    n = len(augmented)
    marcas = np.arange(1, n+1)

    for k in range(0, n-1):
        augmented, marcas = pivoteo_total(augmented, marcas, n, k)
        for i in range(k+1, n):
            mult = augmented[i, k]/augmented[k, k]
            for j in range(k, n+1):
                augmented[i, j] = augmented[i, j] - mult * augmented[k, j]

    return augmented, marcas


def pivoteo_total(augmented, marcas, n, k):
    mayor = 0
    fila_mayor = k
    col_mayor = k
    for r in range(k, n):
        for s in range(k, n):
            if abs(augmented[r, s]) > mayor:
                mayor = abs(augmented[r, s])
                fila_mayor = r
                col_mayor = s
    if mayor == 0:
        raise Exception("El sistema no tiene solución única")
    else:
        if fila_mayor != k:
            augmented = intercambiar_filas(augmented, fila_mayor, k)
        if col_mayor != k:
            augmented = intercambiar_cols(augmented, col_mayor, k)
            marcas = intercambiar_marcas(marcas, col_mayor, k)
        return augmented, marcas


def organizar_marcas(x, marcas):
    x_sorted = np.zeros(len(marcas))

    for i in range(len(marcas)):
        pos = marcas[i] - 1
        x_sorted[pos] = x[int(i)]
    return x_sorted
