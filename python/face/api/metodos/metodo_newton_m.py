from sympy import symbols
from .utils import sympify_expr


class Newton2Method(object):

    def calculate(self, params):
        tol = eval(params["tol"])
        xa = eval(params["x0"])
        n_iter = eval(params["nIters"])
        f = params["fx"]
        f_prima = params["dfx"]
        f_dos_prima = params["d2fx"]

        response = self.init_response()
        contador = 0
        error = tol + 1

        x = symbols("x")
        f = sympify_expr(f)
        f_prima = sympify_expr(f_prima)
        f_dos_prima = sympify_expr(f_dos_prima)

        response["funcion_in"] = str(f)
        response["f_prima"] = str(f_prima)
        response["f_dos_prima"] = str(f_dos_prima)

        fx = f.evalf(subs={x: xa})
        dfx = f_prima.evalf(subs={x: xa})
        d2fx = f_dos_prima.evalf(subs={x: xa})

        while error > tol and fx != 0 and contador < n_iter:
            err_fm = "{e:.2e}".format(e=error) if contador != 0 else ""
            iteracion = [contador, str(xa), err_fm]

            response["iteraciones"].append(iteracion)

            xn = xa - (fx*dfx)/(dfx**2 - fx * d2fx)

            fx = f.evalf(subs={x: xn})
            dfx = f_prima.evalf(subs={x: xn})
            d2fx = f_dos_prima.evalf(subs={x: xn})

            error = abs(xn-xa)
            xa = xn
            contador = contador + 1

        iteracion = [contador, str(xa), str(error)]
        response["iteraciones"].append(iteracion)

        if fx == 0:
            response["raiz"] = str(xa)

        elif error < tol:
            response["aproximado"] = str(xn)
        else:
            response["error"] = "El método fracasó en {} iteraciones"\
                .format(n_iter)

        return response

    def get_description(self):
        return "Este metodo encuentra la raiz de una función aún si tiene \
            raices multiples", "Se necesita tol, x0, n_iter, funcion, f_prima y \
            f_dos_prima"

    def init_response(self):
        response = dict()
        response["iteraciones"] = []

        return response
