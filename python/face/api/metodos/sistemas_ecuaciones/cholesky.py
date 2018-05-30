import numpy as np
from numpy.lib.scimath import sqrt as csqrt

from ..numeric_method import NumericMethod
from .matrix_utils import no_es_invertible, process_params, es_definida_positiva


class FactorizacionCholesky(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A, b = process_params(A, b)
        response = self.init_response()

        if no_es_invertible(A):
            response["error"] = "La matriz no es invertible"
            return response

        if not es_definida_positiva(A):
            response["error"] = "La matriz no definida positiva"
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

        z = self.sustitucion_progresiva(L, b)
        x = self.sustitucion_regresiva(U, z)

        L = np.real(L)
        U = np.real(U)

        response["L"] = np.round(L, 4).tolist()
        response["U"] = np.round(U, 4).tolist()
        response["z"] = np.round(np.real(z), 4).tolist()
        response["x"] = np.round(np.real(x), 4).tolist()

        return response

    def get_description(self):
        return "Retorna una matriz escalonada de acuerdo con una matriz A y un vector b"

    def init_response(self):
        response = dict()

        return response

    def sustitucion_progresiva(self, L, b):
        n = len(L)
        b = b.T
        z = np.zeros(n, dtype="complex")
        z[0] = b[0, 0]/L[0, 0]
        for i in range(1, n):
            suma = np.sum([L[i, p] * z[p] for p in range(i)])
            suma = np.real(suma)

            z[i] = (b[i] - suma)/L[i, i]

        return z

    def sustitucion_regresiva(self, U, z):
        n = len(U)
        x = np.zeros(n, dtype="complex")
        x[n-1] = z[n-1]/U[n-1, n-1]

        for i in range(n-2, -1, -1):
            suma = 0
            for p in range(n-1, i, -1):
                # print(i, p)
                suma = suma + U[i, p] * x[p]
            x[i] = (z[i]-suma)/U[i, i]

        return np.real(x)
