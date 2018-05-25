import numpy as np
from math import sqrt


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


def no_es_invertible(A):
    return np.linalg.det(A) == 0


def process_params(A, b, x0=None):
    n = int(sqrt(len(A)))
    new_A = np.zeros((n, n))
    new_b = np.zeros((1, n))

    for i in range(n):
        for j in range(n):
            pos = str(i) + str(j)
            new_A[i, j] = A[pos]
        new_b[0, i] = b[str(i)]

    if x0 is not None:
        new_x0 = np.zeros(n)
        for i in range(n):
            new_x0[i] = x0[str(i)]

        return new_A, new_b, new_x0

    else:
        return new_A, new_b


def ceros_en_diagonal(matrix):
    for i in range(len(matrix)):
        if matrix[i, i] == 0:
            return True
    return False


def valores_propios(A):
    w, v = np.linalg.eig(A)
    return w


def radio_espectral(A):
    v_prop = valores_propios(A)
    return max(v_prop.min(), v_prop.max(), key=abs)


def norma(A):
    return np.linalg.norm(A, 2)


def get_inverse_D(D):
        D = np.diag(D)
        D = 1/D
        D = np.diag(D)
        return D
