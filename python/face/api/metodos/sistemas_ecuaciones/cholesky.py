import numpy as np
from scipy import linalg

from ..numeric_method import NumericMethod
from .matrix_utils import sustitucion_progresiva, sustitucion_regresiva


class FactorizacionCholesky(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]

        A = np.matrix(eval(A), dtype="float32")
        b = np.matrix(eval(b), dtype="float32")

        response = self.init_response()

        L = linalg.cholesky(A, lower=True)
        U = linalg.cholesky(A, lower=False)

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
