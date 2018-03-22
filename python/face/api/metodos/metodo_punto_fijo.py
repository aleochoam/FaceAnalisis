from sympy import symbols
from .utils import sympify_expr


class FixedPoint():
    def calculate(self, parameters):

        x = symbols("x")
        response = self.init_response()

        # Extracción de los parametros
        g = str(parameters["fx"])
        xa = float(parameters["xa"])
        n_iter = int(parameters["nIters"])
        tol = eval(parameters["tol"])

        # Transformar g a sympy
        g = sympify_expr(g)
        response["funcion_in"] = str(g)

        contador = 0
        error = tol + 1

        while error > tol and contador < n_iter:

            iteracion = [contador, str(xa), str(error)]
            response["iteraciones"].append(iteracion)

            xn = g.evalf(subs={x: xa})

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
        return "Este metodo encuentra el punto fijo de una función x = g(x)",
        "Se necesita funcion, xa, n_iter, y tol"

    def init_response(self):
        response = dict()
        response["iteraciones"] = []
        response["aproximado"] = []

        return response
