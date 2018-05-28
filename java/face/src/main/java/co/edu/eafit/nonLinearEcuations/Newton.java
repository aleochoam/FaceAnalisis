package co.edu.eafit.nonLinearEcuations;

import java.util.ArrayList;
import java.util.List;

import co.edu.eafit.Evaluator;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class Newton implements NumericMethod {
    public Solution calculate(Object... args){
        String function = (String) args[0];
        String derivate = (String) args[1];
        double xa = (Double) args[2];
        double tol = (Double) args[3];
        int nIter = (Integer) args[4];

        double xn = 0;
        int cont = 0;
        double error = tol + 1.0;

        Evaluator evaluator = new Evaluator();
        List<List<Object>> res = new ArrayList<List<Object>>();

        while(error > tol && cont < nIter) {
        	List<Object> iteracion = new ArrayList<Object>();
        	iteracion.add(cont);
        	iteracion.add(xa);
        	iteracion.add(error);
        	res.add(iteracion);

        	xn =  xa - (evaluator.evalExpr(function, xa)/evaluator.evalExpr(derivate, xa));
        	error = Math.abs((xn -xa)/xn);
        	xa = xn;
        	cont++;

        }

        List<Object> iteracion = new ArrayList<Object>();
    	iteracion.add(cont);
    	iteracion.add(xa);
    	iteracion.add(error);
    	res.add(iteracion);

    	return new NonLinearEcuationSolution(res);
    }

    public String getName() {
    	return "Newton";
    }
}