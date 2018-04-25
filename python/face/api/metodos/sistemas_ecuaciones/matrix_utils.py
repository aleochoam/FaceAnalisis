import numpy as np


def concatenar(matrix, vector):
    return np.concatenate((matrix, vector.T), axis=1)


def intercambiar_filas(augmented, fila_mayor, k):
    augmented[[k, fila_mayor]] = augmented[[fila_mayor, k]]
    return augmented


def intercambiar_cols(augmented, col_mayor, k):
    augmented[:, [k, col_mayor]] = augmented[:, [col_mayor, k]].copy()
    return augmented

