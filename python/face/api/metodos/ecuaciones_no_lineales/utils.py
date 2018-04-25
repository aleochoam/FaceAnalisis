from sympy import sympify, symbols


def call_eval_f(parameters):
    f = parameters["funcion"]
    x = parameters["x"]

    response = dict()
    response["y"] = eval_f(f, x)

    return response


def plot_f(parameters):
    f = parameters["funcion"]
    # print(f)
    response = dict()
    response["data"] = []

    for xi in [x*0.1 for x in range(-10, 10)]:
        response["data"].append({"x": str(xi), "y": str(eval_f(f, xi))})

    return response


def eval_f(f, x0):
    f = sympify_expr(f)
    x = symbols("x")

    return str(f.evalf(subs={x: x0}))


def sympify_expr(f):
    if "e" in f:
        f = f.replace("e", "E")
    # if "sen" in f:
    #     f = f.replace("sen", "sin")

    return sympify(f)
