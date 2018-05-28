import numpy as np
from ..numeric_method import NumericMethod
from .interpolacion_utils import process_params
from ..ecuaciones_no_lineales import utils


class MetodoSistemaEcuaciones(NumericMethod):
    def calculate(self, parameters):
        X = parameters["X"]
        Y = parameters["Y"]
        x_eval = parameters["eval"]

        puntos = process_params(X, Y)

        n = len(puntos)
        matriz_vandermonde = []

        for i in range(n):
            x = puntos[i][0]
            fila = self.generar_ecuacion(x, n)
            matriz_vandermonde.append(fila)

        matriz_vandermonde = np.array(matriz_vandermonde)
        b = puntos[:, 1].copy()

        vector_a = np.linalg.solve(matriz_vandermonde, b)
        funcion = self.generar_funcion(np.round(vector_a, 4))
        y_eval = utils.eval_f(funcion[7:], x_eval)

        return {
            "funcion": funcion,
            "matriz": np.round(matriz_vandermonde, 4).tolist(),
            "y_eval": round(eval(y_eval), 2)
            }

    def generar_funcion(self, coeficientes):
        n = len(coeficientes)
        funcion = "p(x) = "
        for i in range(n-1):
            if coeficientes[i] == 0.0:
                continue
            funcion = funcion + str(coeficientes[i]) + "*x^" + str(n-i-1) + " + "

        funcion = funcion + str(coeficientes[n-1])
        return funcion

    def generar_ecuacion(self, x, n):
        coeficientes = []
        for i in range(n-1, -1, -1):
            coeficientes.append(x**i)

        return np.array(coeficientes)
