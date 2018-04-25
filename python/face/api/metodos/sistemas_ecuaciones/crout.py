import numpy as np

from ..numeric_method import NumericMethod
from .matrix_utils import sustitucion_progresiva, sustitucion_regresiva


class FactorizacionCrout(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A = np.matrix(eval(A), dtype="float32")
        b = np.matrix(eval(b), dtype="float32")

        response = self.init_response()

        n = len(A)
        L = np.identity(n)
        U = np.identity(n)

        for k in range(n):
            suma1 = 0

            for p in range(k):
                suma1 = suma1 + L[k, p]*U[p, k]
            L[k, k] = A[k, k]-suma1

            for i in range(k+1, n):
                suma2 = 0
                for p in range(0, k):
                    suma2 = suma2 + L[i, p]*U[p, k]
                L[i, k] = (A[i, k]-suma2)/U[k, k]
            for j in range(k+1, n):
                suma3 = 0
                for p in range(0, k):
                    suma3 = suma3 + L[k, p] * U[p, j]
                U[k, j] = (A[k, j]-suma3)/L[k, k]

        z = sustitucion_progresiva(L, b)
        x = sustitucion_regresiva(U, z)

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
