import numpy as np
from sympy import sympify

from ..numeric_method import NumericMethod
from .interpolacion_utils import process_params, evaluar_splines


class SplinesCubicos(NumericMethod):
    def calculate(self, parameters):
        X = parameters["X"]
        Y = parameters["Y"]
        x_eval = eval(parameters["eval"])

        puntos = process_params(X, Y)

        n = len(puntos) - 1
        puntos = np.array(puntos)
        matrix = np.zeros((n*4, n*4))
        vector_independiente = np.zeros(n*4)

        #  Ecuaciones de interpolacion
        j = 0
        k = 0
        for i in range(0, n*2-1, 2):
            matrix[i, j+0] = puntos[k, 0] ** 3
            matrix[i, j+1] = puntos[k, 0] ** 2
            matrix[i, j+2] = puntos[k, 0]
            matrix[i, j+3] = 1

            matrix[i+1, j+0] = puntos[k+1, 0] ** 3
            matrix[i+1, j+1] = puntos[k+1, 0] ** 2
            matrix[i+1, j+2] = puntos[k+1, 0]
            matrix[i+1, j+3] = 1

            j += 4
            k += 1

        # Ecuaciones de suavidad de primera derivada
        j = 1
        k = 0
        for i in range(n*2, n*3-1):
            matrix[i][k + 0] = 3 * puntos[j, 0]**2
            matrix[i][k + 1] = 2 * puntos[j, 0]
            matrix[i][k + 2] = 1

            matrix[i][k + 3+1] = - 3 * puntos[j, 0]**2
            matrix[i][k + 4+1] = - 2 * puntos[j, 0]
            matrix[i][k + 5+1] = - 1
            j += 1
            k += 4

        #  Ecuaciones de suavidad en concavidad
        j = 1
        k = 0
        for i in range(n*3-1, n*4-2):
            matrix[i][k + 0] = 6 * puntos[j, 0]
            matrix[i][k + 1] = 2

            matrix[i][k + 3+1] = - 6 * puntos[j, 0]
            matrix[i][k + 4+1] = - 2
            j += 1
            k += 4

        # segunda derivada = 0 en los extremos
        matrix[n*4-2, 0] = 6 * puntos[0, 0]
        matrix[n*4-2, 1] = 2

        matrix[n*4-1, n*4-4] = 6 * puntos[n, 0]
        matrix[n*4-1, n*4-3] = 2

        # vector independiente
        vector_independiente[0] = puntos[0, 1]
        j = 1
        for i in range(1, n):
            vector_independiente[j] = puntos[i, 1]
            vector_independiente[j+1] = puntos[i, 1]
            j += 2
        vector_independiente[n*2-1] = puntos[n, 1]

        sol = np.linalg.solve(matrix, vector_independiente)
        funcion = self.generar_ecuacion(sol, puntos)

        try:
            y_eval = evaluar_splines(funcion, puntos, x_eval)
        except Exception as e:
            return {"funcion": funcion, "error": str(e)}

        return {"funcion": funcion, "y_eval": y_eval}

    def generar_ecuacion(self, coeficientes, puntos):
        funcion_partes = []
        coeficientes = np.round(coeficientes, 2)
        n = len(puntos) - 1

        for i in range(0, n*4, 4):
            funcion = "{a}*x**3 + {b}*x**2 + {c}*x + {d}".format(
                a=coeficientes[i],
                b=coeficientes[i+1],
                c=coeficientes[i+2],
                d=coeficientes[i+3],
            )

            funcion = str(sympify(funcion).expand())
            funcion_partes.append([funcion, "{x0} <= x <= {x1}".format(
                    x0=puntos[i//3, 0],
                    x1=puntos[i//3+1, 0]
                )])

        return funcion_partes
