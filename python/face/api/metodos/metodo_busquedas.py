from sympy import symbols
from .utils import sympify_expr


def incremental_search(parameters):
    # Se crean las variables
    found = False
    response = init_response()
    x = symbols("x")

    # Extracción de los parametros
    f = str(parameters["funcion"])
    x0 = float(parameters["x0"])
    delta = float(parameters["delta"])
    n_iter = int(parameters["n_iter"])

    # Transformar f a sympy
    f = sympify_expr(f)
    response["funcion_in"] = str(f)
    fx0 = f.evalf(subs={x: x0})

    if fx0 == 0:
        response["raices"].append(x0)

    x1 = x0 + delta
    contador = 1
    fx1 = f.evalf(subs={x: x1})

    while contador < n_iter:
        if fx1 == 0:
            response["raices"].append(x1)
            found = True
            # print(x1, "es raíz")

        elif fx0 * fx1 < 0:
            response["intervalos"].append([x0, x1])
            found = True
            # print("Hay una raíz entre {} y {}".format(x0, x1))

        x0 = x1
        fx0 = fx1
        x1 = x0 + delta
        fx1 = f.evalf(subs={x: x1})
        contador = contador + 1

    if not found:
        # print("Se fracasó en {} intentos".format(n_iter))
        response["error"] = "Se fracasó en {} intentos".format(n_iter)

    return response


def descripcion_busquedas():
    return "Este método se encarga de encontrar un intervalos con raíces"


def init_response():
    response = dict()
    response["raices"] = []
    response["intervalos"] = []
    # response["error"] = ""

    return response
