from math import e, log
from sympy import *

x = Symbol('x')


x0 = 1
delta =  1.0001
n_iter = 100
f = log(x+2) - x

fx0 = f.evalf(subs={x:x0})
if fx0 == 0:
    print("{0} es raiz".format(x0))
else:
    x1 = x0 + delta
    contador = 1
    fx1 = f.evalf(subs={x:x1})

    while fx0 * fx1 > 0 and contador <= n_iter:
        x0 = x1
        fx0 = fx1
        x1 = x0 + delta
        fx1 = f.evalf(subs={x:x1})
        contador += 1

    if fx1 == 0:
        print("{0} es raiz".format(x0))
    elif (fx0 * fx1) < 0:
        print("Hay una raiz entre {0} y {1}".format(x0, x1))
    else:
        print("Fracaso en {0} iteraciones".format(n_iter))


