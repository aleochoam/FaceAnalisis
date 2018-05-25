import numpy as np
from sympy import sympify

from ..numeric_method import NumericMethod
from .interpolacion_utils import process_params


class SplinesCuadraticos(NumericMethod):
    def calculate(self, parameters):
        X = parameters["X"]
        Y = parameters["Y"]

        puntos = process_params(X, Y)

        n = len(puntos) - 1
        puntos = np.array(puntos)
        matrix = np.zeros((n*3, n*3))
        vector_independiente = np.zeros(n*3)

        #  Ecuaciones de interpolacion
        j = 0
        k = 0
        for i in range(0, n*2, 2):
            matrix[i, j+0] = puntos[k, 0] ** 2
            matrix[i, j+1] = puntos[k, 0]
            matrix[i, j+2] = 1

            matrix[i+1, j+0] = puntos[k+1, 0] ** 2
            matrix[i+1, j+1] = puntos[k+1, 0]
            matrix[i+1, j+2] = 1

            j += 3
            k += 1

        # Ecuaciones de existencia de derivada
        j = 1
        k = 0
        for i in range(n*2, n*3-1):
            matrix[i][k + 0] = 2 * puntos[j, 0]
            matrix[i][k + 1] = 1

            matrix[i][k + 2+1] = - 2 * puntos[j, 0]
            matrix[i][k + 3+1] = - 1
            j += 1
            k += 3

        # primera derivada 0
        matrix[n*3-1, 0] = 1

        # vector independiente
        vector_independiente[0] = puntos[0, 1]
        j = 1
        for i in range(1, n):
            vector_independiente[j] = puntos[i, 1]
            vector_independiente[j+1] = puntos[i, 1]
            j += 2

        sol = np.linalg.solve(matrix, vector_independiente)
        funcion = self.generar_ecuacion(sol, puntos)
        return {"funcion": funcion}

    def generar_ecuacion(self, coeficientes, puntos):
        funcion_partes = []
        coeficientes = np.round(coeficientes, 2)
        n = len(puntos) - 1

        for i in range(0, n*3, 3):
            funcion = "{a}x^2 + {b}x + {c}".format(
                a=coeficientes[i],
                b=coeficientes[i+1],
                c=coeficientes[i+2],
            )
            funcion_partes.append([funcion, "{x0} <= x <= {x1}".format(
                    x0=puntos[i//3, 0],
                    x1=puntos[i//3+1, 0]
                )])

        return funcion_partes
