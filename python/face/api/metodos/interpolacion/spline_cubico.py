import numpy as np
import sympy as sp

from ..numeric_method import NumericMethod
from .interpolacion_utils import eval_params, evaluar_splines


class SplinesCubicos(NumericMethod):
    def calculate(self, parameters):
        X = parameters["X"]
        Y = parameters["Y"]
        x_eval = eval(parameters["eval"])

        X, Y = eval_params(X, Y)
        puntos = np.column_stack((X, Y))
        print(puntos)
        n = len(X)

        # Valores h
        h = np.zeros([n-1])
        for j in range(0, n-1, 1):
            h[j] = X[j+1]-X[j]

        # Sistema de ecuaciones
        A = np.zeros([n-2, n-2])
        B = np.zeros([n-2])
        S = np.zeros([n])

        A[0,  0] = 2*(h[0]+h[1])
        A[0,  1] = h[1]
        B[0] = 6*((Y[2]-Y[1])/h[1] - (Y[1]-Y[0])/h[0])

        for i in range(1, n-3, 1):
            A[i, i-1] = h[i]
            A[i, i] = 2*(h[i]+h[i+1])
            A[i, i+1] = h[i+1]
            B[i] = 6*((Y[i+2]-Y[i+1])/h[i+1] - (Y[i+1]-Y[i])/h[i])

        A[n-3, n-4] = h[n-3]
        A[n-3, n-3] = 2*(h[n-3]+h[n-2])
        B[n-3] = 6*((Y[n-1]-Y[n-2])/h[n-2] - (Y[n-2]-Y[n-3])/h[n-3])

        # Resolver sistema de ecuaciones
        r = np.linalg.solve(A, B)

        # S
        for j in range(1, n-1, 1):
            S[j] = r[j-1]
        S[0] = 0
        S[n-1] = 0

        # Coeficientes
        a = np.zeros([n-1])
        b = np.zeros([n-1])
        c = np.zeros([n-1])
        d = np.zeros([n-1])
        for j in range(0, n-1, 1):
            a[j] = (S[j+1]-S[j])/(6*h[j])
            b[j] = S[j]/2
            c[j] = (Y[j+1]-Y[j])/h[j] - (2*h[j]*S[j]+h[j]*S[j+1])/6
            d[j] = Y[j]

        # Polinomio trazador
        x = sp.Symbol('x')
        polinomio = []
        for j in range(0, n-1, 1):
            ptramo = a[j]*(x-X[j])**3 + b[j]*(x-X[j])**2 + c[j]*(x-X[j]) + d[j]
            ptramo = ptramo.expand()
            polinomio.append(ptramo)

        funcion = self.generar_ecuacion(polinomio, X, n)
        y_eval = evaluar_splines(funcion, puntos, x_eval)
        return {"funcion": funcion, "y_eval": y_eval}

    def generar_ecuacion(self, polinomio, X, n):
        funcion_tramos = []
        for tramo in range(1, n, 1):
            funcion = str(polinomio[tramo-1])
            dominio = "{x0} <= x <= {x1}".format(
                x0=str(X[tramo-1]),
                x1=str(X[tramo])
            )

            funcion_tramos.append([funcion, dominio])

        return funcion_tramos
