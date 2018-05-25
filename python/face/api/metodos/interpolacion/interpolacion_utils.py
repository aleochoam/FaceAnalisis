import numpy as np


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
