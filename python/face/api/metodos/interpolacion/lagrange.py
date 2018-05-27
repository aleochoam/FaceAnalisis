import numpy as np
from sympy import sympify

from ..numeric_method import NumericMethod
from ..ecuaciones_no_lineales import utils


class Lagrange(NumericMethod):
    def calculate(self, parameters):
        x = parameters["X"]
        y = parameters["Y"]
        x_eval = parameters["eval"]

        x = self.process_params(x)
        y = self.process_params(y)

        respuesta = ""
        n = len(x)
        res = ["" for x in range(n)]
        numerador = ""
        denominador = ""
        aux2 = ""

        # Se crea el arreglo, cada posicion es un y*Li(x)
        for i in range(0, n):
            numerador = ""
            denominador = ""
            for j in range(0, n):
                if j is not i:
                    numerador += "(x" + "-" + str(x[j]) + ")*"
                    denominador += ("("+str(x[i]) + "-" + str(x[j]) + ")*")
            numerador = numerador[:-1]
            denominador = denominador[:-1]
            aux = str(y[i]) + "*" + numerador + "/" + denominador
            res[i] = aux

        # Se suman todos los y*Li(x)
        for i in res:
            aux2 += "(" + i + ")" + "+"
        aux2 = aux2[:-1]

        # respuesta = "p(x) = " + str(sympify(aux2))
        respuesta = "p(x) = " + str(aux2)
        y_eval = utils.eval_f(aux2, x_eval)

        return {"funcion": respuesta, "y_eval": y_eval}

    def process_params(self, array):
        n = len(array)
        new_vector = np.zeros(n)

        for i in range(n):
            new_vector[i] = array[str(i)]

        return new_vector
