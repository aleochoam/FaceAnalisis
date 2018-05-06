import numpy as np
from numpy.lib.scimath import sqrt as csqrt

from ..numeric_method import NumericMethod
from .matrix_utils import sustitucion_progresiva, sustitucion_regresiva
from .matrix_utils import no_es_invertible, process_params


class FactorizacionCholesky(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A, b = process_params(A, b)
        response = self.init_response()

        if no_es_invertible(A):
            response["error"] = "La matriz no es invertible"
            return response

        n = len(A)
        # L = np.zeros((n, n))
        # U = np.zeros((n, n))

        # Utilizar estas si se quiere trabajar con complejos
        L = np.zeros((n, n), dtype="complex")
        U = np.zeros((n, n), dtype="complex")

        for k in range(n):
            suma1 = np.sum([L[k, p] * U[p, k] for p in range(0, k)])
            L[k, k] = U[k, k] = csqrt(A[k, k] - suma1)

            for i in range(k+1, n):
                suma2 = np.sum(L[i, p] * U[p, k] for p in range(0, k))
                L[i, k] = (A[i, k] - suma2)/U[k, k]

            for j in range(k+1, n):

                suma3 = np.sum(L[k, p] * U[p, j] for p in range(0, k))
                U[k, j] = (A[k, j] - suma3)/L[k, k]

        L = np.real(L)
        U = np.real(U)

        # z = sustitucion_progresiva(L, b)
        # x = sustitucion_regresiva(U, z)

        response["L"] = np.round(L, 4).tolist()
        response["U"] = np.round(U, 4).tolist()
        # response["z"] = z.tolist()
        # response["x"] = x.tolist()

        return response

    def get_description(self):
        return "Retorna una matriz escalonada de acuerdo con una matriz A y un vector b"

    def init_response(self):
        response = dict()

        return response
