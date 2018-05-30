import numpy as np
from ..ecuaciones_no_lineales.utils import eval_f


def process_params(X, Y):
    n = len(X)
    new_X = np.zeros(n)
    new_Y = np.zeros(n)

    for i in range(n):
        new_X[i] = X[str(i)]
        new_Y[i] = Y[str(i)]

    puntos = np.array((new_X, new_Y)).T
    return puntos


def eval_params(X, Y):
    n = len(X)
    new_X = np.zeros(n)
    new_Y = np.zeros(n)

    for i in range(n):
        new_X[i] = X[str(i)]
        new_Y[i] = Y[str(i)]

    return new_X, new_Y


def evaluar_splines(funcion, puntos, x_eval):
    for i in range(len(puntos) - 1):
        if x_eval >= puntos[i][0] and x_eval <= puntos[i+1][0]:
            y_eval = eval_f(funcion[i][0], x_eval)
            return y_eval
