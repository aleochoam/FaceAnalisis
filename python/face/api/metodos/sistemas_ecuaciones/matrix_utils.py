import numpy as np


def concatenar(matrix, vector):
    return np.concatenate((matrix, vector.T), axis=1)


def intercambiar_filas(augmented, fila_mayor, k):
    augmented[[k, fila_mayor]] = augmented[[fila_mayor, k]]
    return augmented


def intercambiar_cols(augmented, col_mayor, k):
    augmented[:, [k, col_mayor]] = augmented[:, [col_mayor, k]].copy()
    return augmented


def intercambiar_marcas(marcas, i, j):
    marcas[i], marcas[j] = marcas[j], marcas[i]
    return marcas


def sustitucion_progresiva(L, b):
    n = len(L)
    b = b.T
    z = np.zeros(n)
    z[0] = b[0, 0]/L[0, 0]
    for i in range(1, n):
        suma = np.sum([L[i, p] * z[p] for p in range(i)])
        suma = np.real(suma)

        z[i] = (b[i] - suma)/L[i, i]

    return z


def sustitucion_regresiva(U, z):
    n = len(U)
    x = np.zeros(n)
    x[n-1] = z[n-1]/U[n-1, n-1]

    for i in range(n-2, -1, -1):
        suma = 0
        for p in range(n-1, i, -1):
            # print(i, p)
            suma = suma + U[i, p] * x[p]
        x[i] = (z[i]-suma)/U[i, i]

    return x
