import numpy as np

from ..numeric_method import NumericMethod
from .matrix_utils import ceros_en_diagonal, process_params


class Seidel(NumericMethod):
    def calculate(self, parameters):
        A = parameters["A"]
        b = parameters["b"]
        x0 = parameters["x0"]
        tol = parameters["tol"]
        iteraciones = parameters["iteraciones"]

        A, b, x0 = process_params(A, b, x0)
        b = b[0]
        tol = eval(tol)
        iteraciones = int(iteraciones)

        response = self.init_response()

        if ceros_en_diagonal(A):
            response["error"] = "La matriz contiene ceros en la diagonal"
            return response

        contador = 0
        dispersion = tol + 1

        while dispersion > tol and contador < iteraciones:
            x1 = self.calcular_nuevo(A, b, x0)
            dispersion = self.error(x1 - x0)

            disp_fmt = "{e:.2e}".format(e=dispersion) if contador != 0 else ""
            iteracion = [contador, x0.tolist(), disp_fmt]
            response["iteraciones"].append(iteracion)

            x0 = x1.copy()
            contador = contador + 1

        iteracion = [contador, x0.tolist(), dispersion]
        response["iteraciones"].append(iteracion)

        if dispersion < tol:
            response["aproximados"].append(x1.tolist())
            # print(x1, "es una aproximación inicial con una toleracia de {}".format(tol))
        else:
            response["error"] = "El algoritmo fracasó despues de {} \
                iteraciones".format(iteraciones)
            # print("El método fracasó en {} iteraciones".format(iteraciones))

        return response

    def calcular_nuevo(self, matrix, b, x0):
        n = len(x0)
        x1 = np.zeros(n)
        for i in range(n):
            x1[i] = x0[i]

        for i in range(n):
            suma = 0
            for j in range(n):
                if j != i:
                    suma = suma + matrix[i, j] * x1[j]
            x1[i] = (b[i] - suma)/matrix[i, i]
        return x1

    def error(self, x):
        return np.amax(np.absolute(x))

    def get_description(self):
        return "Metodo iterativo Jacobi"

    def init_response(self):
        response = dict()
        response["iteraciones"] = []
        response["aproximados"] = []

        return response
