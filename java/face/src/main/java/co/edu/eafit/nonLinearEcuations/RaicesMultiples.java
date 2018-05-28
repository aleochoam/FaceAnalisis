package co.edu.eafit.nonLinearEcuations;

import java.util.ArrayList;
import java.util.List;

import co.edu.eafit.Evaluator;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class RaicesMultiples implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {

		String f = (String) args[0];
		String fPrima = (String) args[1];
		String f2Prima = (String) args[2];
		double xa = (Double) args[3];
		double tol = (Double) args[4];
        int n_iter = (Integer) args[5];

        List<List<Object>> res = new ArrayList<List<Object>>();
        Evaluator eval = new Evaluator();
        int contador = 0;
        double error = tol + 1;

        double fx = eval.evalExpr(f, xa);
        double dfx = eval.evalExpr(fPrima, xa);
        double d2fx = eval.evalExpr(f2Prima, xa);

        while (error > tol && fx != 0 && contador < n_iter) {
        	List<Object> iteracion = new ArrayList<Object>();
        	iteracion.add(contador);
        	iteracion.add(xa);
        	iteracion.add(error);
        	res.add(iteracion);

            double xn = xa - (fx*dfx)/(Math.pow(dfx, 2) - fx * d2fx);

            fx = eval.evalExpr(f, xn);
            dfx = eval.evalExpr(fPrima, xn);
            d2fx = eval.evalExpr(f2Prima, xn);

            error = Math.abs(xn-xa);
            xa = xn;
            contador++;
        }
        List<Object> iteracion = new ArrayList<Object>();
    	iteracion.add(contador);
    	iteracion.add(xa);
    	iteracion.add(error);
    	res.add(iteracion);

        if (fx == 0) {
        	iteracion = new ArrayList<Object>();
        	iteracion.add("Raiz");
        	iteracion.add(xa);
        	res.add(iteracion);
        }else if (error < tol) {
        	iteracion = new ArrayList<Object>();
        	iteracion.add("Aproximado");
        	iteracion.add(xa);
        	res.add(iteracion);
        }else {
        	iteracion = new ArrayList<Object>();
        	iteracion.add("error");
        	iteracion.add("El método fracasó en " + n_iter + " iteraciones");
        	res.add(iteracion);
        }

        return new NonLinearEcuationSolution(res);

	}

	@Override
	public String getName() {
		return "Raices Multiples";
	}

}
