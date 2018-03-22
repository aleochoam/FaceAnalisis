from sympy import symbols
from .utils import sympify_expr


class NewtonMethod(object):

    def calculate(self, params):
        tol = eval(params["tol"])
        xa = eval(params["x0"])
        n_iter = eval(params["nIters"])
        f = params["fx"]
        f_prima = params["dfx"]

        response = self.init_response()
        contador = 0
        error = tol + 1

        f = sympify_expr(f)
        f_prima = sympify_expr(f_prima)
        x = symbols("x")

        response["funcion_in"] = str(f)
        response["der_in"] = str(f_prima)

        fx = f.evalf(subs={x: xa})
        dfx = f_prima.evalf(subs={x: xa})

        while error > tol and fx != 0 and dfx != 0 and contador < n_iter:

            iteracion = [contador, str(xa), str(error)]
            response["iteraciones"].append(iteracion)

            xn = xa - fx/dfx
            fx = f.evalf(subs={x: xn})
            dfx = f_prima.evalf(subs={x: xn})

            error = abs((xn-xa)/xn)
            xa = xn
            contador = contador + 1

        iteracion = [contador, str(xa), str(error)]
        response["iteraciones"].append(iteracion)

        if fx == 0:
            response["raiz"] = str(xa)
        elif error < tol:
            response["aproximado"] = str(xn)
        elif dfx == 0:
            response["error"] = "{} es una posible raíz multiple".format(xn)
        else:
            response["error"] = "El método fracasó en {} iteraciones"\
                .format(n_iter)

        return response

    def get_description(self):
        return "Este metodo encuentra la raiz de una función a través del \
            metodo de Newton", "Se necesita tol, x0, n_iter, funcion y f_prima"

    def init_response(self):
        response = dict()
        response["iteraciones"] = []

        return response
