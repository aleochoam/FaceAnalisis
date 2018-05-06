import numpy as np

from ..numeric_method import NumericMethod
from .matrix_utils import sustitucion_regresiva, sustitucion_progresiva
from .matrix_utils import no_es_invertible, process_params


class FactorizacionGaussiana(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A, b = process_params(A, b)
        response = self.init_response()

        if no_es_invertible(A):
            response["error"] = "La matriz no es invertible"
            return response

        L, U = factorizar(A, b)
        z = sustitucion_progresiva(L, b)
        x = sustitucion_regresiva(U, z)

        L = np.round(L, 2)
        U = np.round(U, 2)

        response["L"] = np.round(L, 4).tolist()
        response["U"] = np.round(U, 4).tolist()

        response["z"] = np.round(z, 4).tolist()
        response["x"] = np.round(x, 4).tolist()

        return response

    def get_description(self):
        return "Retorna una matriz escalonada de acuerdo con una matriz A y un vector b"

    def init_response(self):
        response = dict()

        return response


def factorizar(matrix, vector):
    n = len(matrix)

    L = np.identity(n)
    U = np.zeros((n, n))

    m_augm = np.concatenate((matrix, vector.T), axis=1)

    for k in range(0, n-1):
        for i in range(k+1, n):
            multiplier = m_augm[i, k]/m_augm[k, k]
            if i > k:
                L[i][k] = multiplier
            for j in range(k, n+1):
                m_augm[i, j] = m_augm[i, j] - multiplier * m_augm[k, j]

    U = m_augm.copy()
    U = np.delete(U, n, axis=1)

    return L, U
