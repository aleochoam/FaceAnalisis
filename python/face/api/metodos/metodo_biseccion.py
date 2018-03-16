from math import e, fabs, log
from sympy import *
# from prettytable import PrettyTable  #  Instalar con pip

x = Symbol('x')

t = PrettyTable(['i', 'xInf', 'xSup', 'xMed', 'f(xMed)', 'Error Absoluto'])


def calcNumIter(x1, x2, tolerancia):
    x = float(log((x2-x1)) - log(tolerancia)) # (b - a / 2^n) < tol
    n = float((x / log(2)))
    n = str(n)

    # Se suma 1 porque n debe ser mayor al resultado de esa operacion
    n = int((int(n.split(".")[0]) + 1))
    return n


xInf = -1.0
xSup = 8.0

# Cuando nos hablan de tolerancia podemos usar error relativo o absoluto
tole = 0.5*10**-5
nIter = calcNumIter(xInf, xSup, tole)

funcion = cos(x) - cos(3.1*x)

fInf = funcion.evalf(subs={x: xInf})
fSup = funcion.evalf(subs={x: xSup})


if fInf == 0:
    print "La raiz es {0}".format(xInf)
elif fSup == 0:
    print "La raiz es {0}".format(xSup)
elif fInf * fSup < 0:
    xMed = (xInf + xSup)/2.0
    fMed = funcion.evalf(subs={x: xMed})
    cont = 1
    error = tole + 1

    # Agregando a la tabla la primer fila
    t.add_row([cont, xInf, xSup, xMed, fMed, 0])

    while (error > tole) and (fMed != 0) and (cont <= nIter):
        if fInf * fMed < 0:
            xSup = xMed
            fSup = fMed
        else:
            xInf = xMed
            fInf = fMed
        xAux = xMed
        xMed = (xInf + xSup)/2
        fMed = funcion.evalf(subs={x: xMed})
        error = fabs(xMed - xAux)
        cont += 1

        # Agregando a la tabla el resto de filas.
        t.add_row([cont, xInf, xSup, xMed, fMed, error])

    if fMed == 0:
        print "{0} es raiz".format(xMed)
    elif error < tole:
        print "{0} es aproximacion a una raiz con una tolerancia = {1}".\
            format(xMed, tole)
    else:
        print "Fracaso el {0} iteraciones".format(nIter)
else:
    print "El intervalo es inadecuado"


print t
