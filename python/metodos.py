from math import exp, cos

def f(x):
    return exp(3*x-12)+x*cos(3*x) -x**2 +4

def punto_fijo(xa, tol, nIter):
    def g(x):
        return (10/(x+4))**(1/2)

    fx = f(xa)
    contador = 0
    error = tol + 1

    while abs(fx) < tol and error > tol and contador < nIter:
        xn = g(xa)
        fx = f(xn)
        error = abs(xn-xa)
        xa = xn
        contador = contador + 1

    if fx == 0:
        print (xa, "es raíz")
    elif error < tol:
        print(xa, "es aproximación con una toleracion = ", tol)
    else:
        print("El método fracasó en {} iteraciones".format(nIter))

def regla_falsa(xa, xb, tol, nIter):
    fxa = f(xa)
    fxb = f(xb)

    if abs(fxa) < tol:
        print(xa, "es raíz")
    if abs(fxb) < tol:
        print(xb, "es raíz")

    if fxa * fxb > 0:
        print("El intervalo es inadecuado")
        return

    xm = xa - ((fxa*(xb-xa))/(fxb - fxa)) # Ecuación 15, regla falsa

    fxm = f(xm)
    contador = 1
    error = tol + 1

    while error > tol and abs(fxm) > tol and contador < nIter:
        print("xa: {}".format(xa))
        print("xb: {}".format(xb))
        print("xm: {}".format(xm))
        print("fxm: {}".format(fxm))
        print("error: {}".format(error))
        print("--------------------")

        if fxa * fxm < 0:
            xb = xm
            fxb = fxm
        elif fxm * fxb < 0:
            xa = xm
            fxa = fxm
        else:
            print("error")

        x_ant = xm
        xm = xa - ((fxa*(xb-xa))/(fxb - fxa)) # Ecuación 15, regla falsa
        fxm = f(xm)
        error = abs(xm - x_ant)
        contador = contador +1

    if abs(fxm) < tol:
        print(xm, "es raiz")
    elif error < tol:
        print(xm, "es aproximación a una raíz con una tolerancia =", tol)
    else:
        print("El algoritmo fracasó despues de {} iteraciones".format(nIter))



def biseccion(xa, xb, tol, nIter):
    fxa = f(xa)
    fxb = f(xb)

    if abs(fxa) < tol:
        print(xa, "es raíz")
    if abs(fxb) < tol:
        print(xb, "es raíz")

    if fxa * fxb > 0:
        print("El intervalo es inadecuado")
        return

    xm = (xb+xa)/2
    fxm = f(xm)
    contador = 1
    error = tol + 1

    while error > tol and abs(fxm) > tol and contador < nIter:

        if fxa * fxm < 0:
            xb = xm
            fxb = fxm
        elif fxm * fxb < 0:
            xa = xm
            fxa = fxm
        else:
            print("error")

        x_ant = xm
        xm = (xa+xb)/2
        fxm = f(xm)
        error = abs(xm - x_ant)
        contador = contador +1

    if abs(fxm) < tol:
        print(xm, "es raiz")
    elif error < tol:
        print(xm, "es aproximación a una raíz con una tolerancia =", tol)
    else:
        print("El algoritmo fracasó despues de {} iteraciones".format(nIter))


def busquedas_incrementales(x0, deltaX, tol, nIter):
    found = False

    fx0 = f(x0)
    if abs(fx0) < tol:
        print(x0, "es una raíz")

    x1 = x0 + deltaX
    contador = 1
    fx1 = f(x1)

    while contador < nIter:
        if abs(fx1) < tol:
            print(x1, "es raíz")
            found = True
        elif fx0 * fx1 < 0:
            print("Hay una raíz entre {} y {}".format(x0, x1))
            found = True

        x0 = x1
        fx0 = fx1
        x1 = x0 + deltaX
        fx1 = f(x1)
        contador = contador + 1


    if not found:
        print("Se fracasó en {} intentos".format(nIter))


def main():
    biseccion(2,3,0.5e-3, 100)
    regla_falsa(2,3,0.5e-3, 100)
    punto_fijo(-0.5, 1e-5, 100)


if __name__ == '__main__':
    main()
