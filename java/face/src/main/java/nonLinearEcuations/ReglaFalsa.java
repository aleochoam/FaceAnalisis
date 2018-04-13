package nonLinearEcuations;

import java.util.ArrayList;
import java.util.List;

import co.edu.eafit.Evaluator;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class ReglaFalsa implements NumericMethod {

	private final Evaluator eval;
    

    public ReglaFalsa() {
        eval = new Evaluator();        
    }


    private List<Object> completeInner(double cont, double xa, double xb, double xm, double fxm, double error){
        List<Object> inner = new ArrayList<Object>(6);
        inner.add(cont);
        inner.add(xa);
        inner.add(xb);
        inner.add(xm);
        inner.add(fxm);
        inner.add(error);
        return inner;
    }


    public Solution calculate(Object... args){
    	String fx = (String) args[0];
    	double xa = (Double) args[1];
    	double xb = (Double) args[2];
    	double tol = (Double) args[3];
    	int niter = (Integer) args[4];
    	
        List<List<Object>> res = new ArrayList<List<Object>>();
        
        double fxa, fxb, xm, fxm, error, xaux, contador, zero = 0;
        
        
        fxa = this.eval.evalExpr(fx, xa);
        fxb = this.eval.evalExpr(fx, xb);

        if (fxa == zero) {
            System.out.println(xa + " Es raiz");
            
        } else if (fxb == zero) {
            System.out.println(xb + " Es raiz");
            
        } else if ((fxa * fxb) < 0) {
            xm = (xa + xb) / 2.0;
            xm = xa - ((fxa*(xb-xa))/(fxb - fxa));  // EcuaciÛn 15, regla falsa
            
            fxm = eval.evalExpr(fx, xm);
            contador = 1;
            error = tol + 1;

            res.add(completeInner(contador, xa, xb, xm, fxm, 0));

            while ((error > tol) && (fxm != 0) && (contador <= niter)){
                if ((fxa * fxm) < 0) {
                    xb = xm;
                    fxb = fxm;
                } else {
                    xa = xm;
                    fxa = fxm;
                }
                xaux = xm;
                xm = xa - ((fxa*(xb-xa))/(fxb - fxa));  // EcuaciÛn 15, regla falsa
                fxm = eval.evalExpr(fx, xm);
                error = Math.abs(xm - xaux);
                contador += 1;
                res.add(completeInner(contador, xa, xb, xm, fxm, error));
            }

            if (fxm == 0) {
            	List<Object> iteracion = new ArrayList<Object>();
            	iteracion.add(contador);
            	iteracion.add("Raiz");
            	iteracion.add(xm);
                //System.out.println(xm + " Es raiz");
                
            } else if (error < tol){
            	List<Object> iteracion = new ArrayList<Object>();
            	iteracion.add(contador);
            	iteracion.add("Aproximaci√≥n");
            	iteracion.add(xm);
                // System.out.println(xm + " Es una aproximacion a una raiz con una tolerancia = " + tol + "\n");
                
            } else {
            	List<Object> iteracion = new ArrayList<Object>();
            	iteracion.add(contador);
            	iteracion.add("Error");
            	iteracion.add("Fracaso en " + niter + " iteraciones\n");
//                System.out.println("Fracaso en " + niter + " iteraciones\n");
                
            }
        } else {
            System.out.println("El intervalo es inadecuado\n"); 
        }
        return new NonLinearEcuationSolution(res);
    }



	@Override
	public String getName() {
		return "Regla Falsa";
	}

}
