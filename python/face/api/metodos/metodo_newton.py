from sympy import symbols
from .utils import sympify_expr


class NewtonMethod(object):

    def calculate(self, params):
        tol = eval(params["tol"])
        xa = eval(params["x0"])
        n_iter = eval(params["n_iter"])
        f = params["funcion"]
        f_prima = params["f_prima"]

        response = self.init_response()
        contador = 0
        error = tol + 1

        f = sympify_expr(f)
        f_prima = sympify_expr(f_prima)
        x = symbols("x")

        response["funcion_in"] = str(f)
        response["der_in"] = str(f_prima)

        while error > tol and contador < n_iter:

            iteracion = [contador, str(xa), str(error)]
            response["iteraciones"].append(iteracion)

            xn = xa - (f.evalf(subs={x: xa}) / f_prima.evalf(subs={x: xa}))

            error = abs((xn-xa)/xn)
            xa = xn
            contador = contador + 1

        iteracion = [contador, str(xa), str(error)]
        response["iteraciones"].append(iteracion)

        if error < tol:
            response["aproximado"].append(str(xn))
        else:
            response["error"] = "El método fracasó en {} iteraciones"\
                .format(n_iter)

        return response

    def get_description(self):
        return "Este metodo encuentra la raiz de una función a través del \
            metodo de Newton"

    def init_response(self):
        response = dict()
        response["iteraciones"] = []
        response["aproximado"] = []

        return response