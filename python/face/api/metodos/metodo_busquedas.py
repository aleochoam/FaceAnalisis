from sympy.parsing.sympy_parser import parse_expr
from sympy import Symbol


def calcular_busquedas(parametros):
    x = Symbol("x")

    f = str(parametros["funcion"])
    f = parse_expr(f)

    x0 = float(parametros["x0"])
    delta = float(parametros["delta"])
    n_iter = int(parametros["n_iter"])

    response = dict()
    response["raices"] = []
    response["intervalos"] = []
    response["error"] = ""

    fx0 = f.evalf(subs={x: x0})
    if fx0 == 0:
        print("{0} es raiz".format(x0))
    else:
        x1 = x0 + delta
        contador = 1
        fx1 = f.evalf(subs={x: x1})

        while fx0 * fx1 > 0 and contador <= n_iter:
            x0 = x1
            fx0 = fx1
            x1 = x0 + delta
            fx1 = f.evalf(subs={x: x1})
            contador += 1

        if fx1 == 0:
            print("{0} es raiz".format(x0))
        elif (fx0 * fx1) < 0:
            print("Hay una raiz entre {0} y {1}".format(x0, x1))
        else:
            response["error"] = "Fracaso en {0} iteraciones".format(n_iter)

    return response


def descripcion():
    return "Este método se encarga de encontrar un intervalos con raíces"
