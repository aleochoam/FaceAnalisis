package co.edu.eafit.nonLinearEcuations;

import java.util.ArrayList;
import java.util.List;

import co.edu.eafit.Evaluator;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;


public class IncrementalSearch implements NumericMethod {
    private final Evaluator eval;


    public IncrementalSearch() {
        eval = new Evaluator();
    }


    public Solution calculate(Object... args){
    	String fx = (String) args[0];
    	double x0 = (Double) args[1];
    	double delta = (Double) args[2];
    	int niter = (Integer) args[3];
    	
    	double fx0, fx1, x1, zero = 0;
    	boolean found = false;

    	List<List<Object>> res = new ArrayList<List<Object>>();

        fx0 = eval.evalExpr(fx, x0);

        if(fx0 == zero){
        	List<Object> iteracion = new ArrayList<Object>();
        	iteracion.add("Raiz");
        	iteracion.add(fx0);
        	res.add(iteracion); 

        } else {
            x1 = x0 + delta;
            int contador = 1;

            fx1 = eval.evalExpr(fx, x1);
            while(contador <= niter){
            	if(fx1 == zero){
                	List<Object> iteracion = new ArrayList<Object>();
                	iteracion.add("Raiz");
                	iteracion.add(x1);
                	
                	res.add(iteracion);
                	found = true;
                	
                }else if ((fx0 * fx1) < 0){
                	
                	List<Object> iteracion = new ArrayList<Object>();

                	iteracion.add(x0);
                	iteracion.add(x1);
                	
                	res.add(iteracion);
                	found = true;
                }
            	
                x0 = x1;
                fx0 = fx1;
                x1 = x0 + delta;
                fx1 = eval.evalExpr(fx, x1);
                contador += 1;
            
            }
            if(!found){
            	List<Object> iteracion = new ArrayList<Object>();
            	iteracion.add("Error");
            	iteracion.add("No se encontraron raices");
            }
        }
        return new NonLinearEcuationSolution(res);
    }


	@Override
	public String getName() {
		return "Busquedas Incrementales";
	}


}
