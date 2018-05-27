package co.edu.eafit.nonLinearEcuations;

import java.lang.Math;
import java.util.ArrayList;
import java.util.List;

import co.edu.eafit.Evaluator;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;


public class PuntoFijo implements NumericMethod{
    private final Evaluator eval;
    

    public PuntoFijo() {
        eval = new Evaluator();
    }


    public Solution calculate(Object... args){
    	String gx = (String) args[0];
    	double x0 = (Double) args[1];
    	double tol = (Double) args[2];
    	int niter = (Integer) args[3];
    	
        double error, xn;
        int contador;
        
        List<List<Object>> res = new ArrayList<List<Object>>();
      	contador = 0;
      	error = tol +1;

      	while(error > tol && contador < niter){
      		List<Object> iteracion = new ArrayList<Object>();
        	iteracion.add(contador);
        	iteracion.add(x0);
        	iteracion.add(contador == 0 ? "" : error);
        	res.add(iteracion);
      		
      		
          	xn = this.eval.evalExpr(gx,x0);
          	error = Math.abs(xn-x0);
          	x0 = xn;
          	contador++;

      	}
      	
      	List<Object> iteracion = new ArrayList<Object>();
    	iteracion.add(contador);
    	iteracion.add(x0);
    	iteracion.add(error);
    	res.add(iteracion);
      	
//      	if (error < tol){
//      		System.out.println(x0 + " Es una aproximacion con una tolerancia " + tol);
//
//      	}else{
//      	  System.out.println("Método fracaso en " + niter + " Iteraciones");
//
//      	}
      	
      	return new NonLinearEcuationSolution(res);
    }


	@Override
	public String getName() {
		return "Punto Fijo";
	}
}
