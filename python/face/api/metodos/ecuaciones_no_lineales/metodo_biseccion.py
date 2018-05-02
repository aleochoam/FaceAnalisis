from .utils import sympify_expr
from .utils import error_absoluto, error_relativo
from sympy import symbols

from ..numeric_method import NumericMethod



class Bisection(NumericMethod):

    def calculate(self, parameters):
        # Se crean las variables
        response = self.init_response()
        x = symbols("x")

        # Extracción de los parametros
        f = str(parameters["fx"])
        xa = float(parameters["xa"])
        xb = float(parameters["xb"])
        n_iter = int(parameters["nIters"])
        tol = eval(parameters["tole"])
        tipo_error = parameters["tipo_error"]

        calcular_error = error_relativo if tipo_error == 2 else error_absoluto

        # Transformar f a sympy
        f = sympify_expr(f)
        response["funcion_in"] = str(f)

        fxa = f.evalf(subs={x: xa})
        fxb = f.evalf(subs={x: xb})

        if abs(fxa) == 0:
            response["raices"].append(xa)
            # print(xa, "es raíz")

        if abs(fxb) == 0:
            response["raices"].append(xb)
            # print(xb, "es raíz")

        if fxa * fxb > 0:
            # print("El intervalo es inadecuado")
            response["error"] = "El intervalo es inadecuado"
            return response

        xm = (xb+xa)/2
        fxm = f.evalf(subs={x: xm})
        contador = 1
        error = tol + 1

        while error > tol and fxm != 0 and contador < n_iter:
            err_fm = "{e:.2e}".format(e=error) if contador != 1 else ""
            iteracion = [contador, str(xa), str(xb), str(xm), str(fxm), err_fm]

            response["iteraciones"].append(iteracion)
            # print("Contador: ", contador)
            # print("xa: {}".format(xa))
            # print("xb: {}".format(xb))
            # print("xm: {}".format(xm))
            # print("fxm: {}".format(fxm))
            # print("error: {}".format(error))
            # print("--------------------")

            if fxa * fxm < 0:
                xb = xm
                fxb = fxm
            elif fxm * fxb < 0:
                xa = xm
                fxa = fxm
            else:
                # print("error")
                response["error"] = "Se ha encontrado un error"

            x_ant = xm
            xm = (xa+xb)/2
            fxm = f.evalf(subs={x: xm})
            error = calcular_error(xm, x_ant)
            # error = abs(xm - x_ant)
            contador = contador + 1

        iteracion = [contador, str(xa), str(xb), str(xm), str(fxm), str(error)]
        response["iteraciones"].append(iteracion)

        if fxm == 0:
            response["raices"].append(str(xm))
            # print(xm, "es raiz")

        elif error < tol:
            response["aproximados"].append(str(xm))
            # print(xm, "es aproximación a una raíz con una tolerancia =", tol)

        else:
            response["error"] = "El algoritmo fracasó despues de {} \
                iteraciones".format(n_iter)

        return response

    def get_description(self):
        return "Este metodo se encarga de encontrar una raíz dado un rango donde \
        hay un cambio de signo", "Se necesita: funcion, xa, xb, n_iter y tol"

    def init_response(self):
        response = dict()
        response["raices"] = []
        response["iteraciones"] = []
        response["aproximados"] = []

        return response