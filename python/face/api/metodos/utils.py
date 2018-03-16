from sympy import sympify


def sympify_expr(f):
    if "e" in f:
        f = f.replace("e", "E")
    # if "sen" in f:
    #     f = f.replace("sen", "sin")

    return sympify(f)


def init_response():
    response = dict()
    response["raices"] = []
    response["intervalos"] = []
    # response["error"] = ""

    return response
