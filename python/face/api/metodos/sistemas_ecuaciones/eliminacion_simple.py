import numpy as np

from ..numeric_method import NumericMethod
from .matrix_utils import concatenar, intercambiar_filas, sustitucion_regresiva
from .matrix_utils import no_es_invertible


class EliminacionSimple(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A = np.matrix(eval(A), dtype="float32")
        b = np.matrix(eval(b), dtype="float32")

        response = self.init_response()

        if no_es_invertible(A):
            response["error"] = "La matriz no es invertible"
            return response

        augmented = eliminacion(A, b)
        augmented = np.round(augmented, 2)

        A = np.delete(augmented.copy(), len(augmented), 1)
        b = augmented[:, len(augmented)]
        x = sustitucion_regresiva(A, b)

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

    for k in range(0, n-1):
        if augmented[k, k] == 0:
            fila = k
            for i in range(k, n):
                if augmented[i, k] != 0:
                    fila = i
                    break
            augmented = intercambiar_filas(augmented, fila, k)

        for i in range(k+1, n):
            mult = augmented[i, k]/augmented[k, k]
            for j in range(k, n+1):
                augmented[i, j] = augmented[i, j] - mult * augmented[k, j]

    return augmented
