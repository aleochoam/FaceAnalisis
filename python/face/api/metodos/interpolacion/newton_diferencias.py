import numpy as np
from ..numeric_method import NumericMethod
from .interpolacion_utils import process_params
from ..ecuaciones_no_lineales import utils


class NewtonDiferenciasDivididas(NumericMethod):
    def calculate(self, parameters):
        X = parameters["X"]
        Y = parameters["Y"]
        x_eval = parameters["eval"]

        puntos = process_params(X, Y)

        n = len(puntos)

        matrix = np.zeros((n, n+1))
        for i in range(n):
            matrix[i, 0] = puntos[i, 0]
            matrix[i, 1] = puntos[i, 1]

        k = 1
        for i in range(2, n+1):
            for j in range(i, n+1):
                fxk_1 = matrix[j-1-1, i-1]
                fxk = matrix[j-1, i-1]

                xk_1 = matrix[j-1, 0]
                xk = matrix[j-1-k, 0]

                matrix[j-1, i] = (fxk - fxk_1) / (xk_1 - xk)
            k += 1

        funcion = self.generar_polinomio(matrix, puntos)
        y_eval = utils.eval_f(funcion[7:], x_eval)
        return {"funcion": funcion, "y_eval": round(y_eval, 2)}

    def generar_polinomio(self, matrix, puntos):
        funcion = "p(x) = "

        xs = []
        for i in range(len(matrix)):
            if i != 0:
                x = np.round(puntos[i-1, 0], 2)
                xs.append("*(x - {x})".format(x=x))

            const = np.round(matrix[i, i+1], 3)

            if const == 0:
                continue
            funcion += str(const) + "".join(xs) + " + "

        return funcion[:-3]  # [:-3] para quitar el ultimo '+'
