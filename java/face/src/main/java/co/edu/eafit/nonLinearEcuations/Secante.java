package co.edu.eafit.nonLinearEcuations;

import java.util.ArrayList;
import java.util.List;

import co.edu.eafit.Evaluator;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class Secante implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		String f = (String) args[0];
		double x0 = (Double) args[1];
		double x1 = (Double) args[2];
		double tol = (Double) args[3];
		int n_iter = (Integer) args[4];
		
		List<List<Object>> res = new ArrayList<List<Object>>();
		int contador = 0;
		double error = tol + 1;

		Evaluator eval = new Evaluator();
 
        double fx0 = eval.evalExpr(f, x0);
        if (fx0 == 0) {
        	List<Object> iteracion = new ArrayList<Object>();
        	iteracion.add("raiz");
        	iteracion.add(x0);
        	res.add(iteracion);
        	return new NonLinearEcuationSolution(res);
        }else {
        	double fx1 = eval.evalExpr(f, x1);
        	double den = fx1 - fx0;
        	
        	while(error > tol && fx1 != 0 && den != 0 && contador < n_iter) {
        		List<Object> iteracion = new ArrayList<Object>();
        		iteracion.add(contador);
        		iteracion.add(x0);
        		iteracion.add(fx0);
        		iteracion.add(error);
        		res.add(iteracion);
        		
        		double x2 = x1 - fx1 * (x1-x0) / den;
        		error = Math.abs(x2-x1);
        		x0 = x1;
        		fx0 = fx1;
        		x1 = x2;
        		fx1 = eval.evalExpr(f, x1);
        		den = fx1 - fx0;
        		contador++;
        		
        	}
        	List<Object> iteracion = new ArrayList<Object>();
    		iteracion.add(contador);
    		iteracion.add(x0);
    		iteracion.add(fx0);
    		iteracion.add(error);
    		res.add(iteracion);
        
	        if (fx1 == 0) {
	        	iteracion = new ArrayList<Object>();
	        	iteracion.add("Raiz");
	        	iteracion.add(x1);
	        }else if (error < tol) {
	        	iteracion = new ArrayList<Object>();
	        	iteracion.add("Aproximacion");
	        	iteracion.add(x1);
	        }else if(den == 0) {
	        	iteracion = new ArrayList<Object>();
	        	iteracion.add("Error");
	        	iteracion.add("Posible raiz multiple");
	        }else {
	        	iteracion = new ArrayList<Object>();
	        	iteracion.add("Error");
	        	iteracion.add("fracasó en " + n_iter + "iteraciones");
	        }	            
        }
        return new NonLinearEcuationSolution(res);

	}

	@Override
	public String getName() {
		return "Secante";
	}

}
