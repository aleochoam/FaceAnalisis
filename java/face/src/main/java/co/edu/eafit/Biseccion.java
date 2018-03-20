package co.edu.eafit;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.util.ArrayList;
import java.util.List;


public class Biseccion implements NumericMethod{
    
    private final Evaluator eval;
    private final BufferedReader br;
    

    public Biseccion() {
        eval = new Evaluator();
        br = new BufferedReader(new InputStreamReader(System.in));        
    }


    private List<Object> completeInner(double cont, double xi, double xs, double xm, double fxm, double error){
        List<Object> inner = new ArrayList<Object>(6);
        inner.add(cont);
        inner.add(xi);
        inner.add(xs);
        inner.add(xm);
        inner.add(fxm);
        inner.add(error);
        return inner;
    }


    public List<List<Object>> calculate(Object... args){
    	String fx = (String) args[0];
    	double xi = (Double) args[1];
    	double xs = (Double) args[2];
    	double tol = (Double) args[3];
    	int niter = (Integer) args[4];
    	
        List<List<Object>> res = new ArrayList<List<Object>>();
        
        double fxi, fxs, xm, fxm, error, xaux, contador, zero = 0;
        
        
        fxi = this.eval.evalExpr(fx, xi);
        fxs = this.eval.evalExpr(fx, xs);

        if (fxi == zero) {
            System.out.println(xi + " Es raiz");
            
        } else if (fxs == zero) {
            System.out.println(xs + " Es raiz");
            
        } else if ((fxi * fxs) < 0) {
            xm = (xi + xs) / 2.0;
            fxm = eval.evalExpr(fx, xm);
            contador = 1;
            error = tol + 1;

            res.add(completeInner(contador, xi, xs, xm, fxm, 0));

            while ((error > tol) && (fxm != 0) && (contador <= niter)){
                if ((fxi * fxm) < 0) {
                    xs = xm;
                    fxs = fxm;
                } else {
                    xi = xm;
                    fxi = fxm;
                }
                xaux = xm;
                xm = (xi + xs) / 2.0;
                fxm = eval.evalExpr(fx, xm);
                error = Math.abs(xm - xaux);
                contador += 1;
                res.add(completeInner(contador, xi, xs, xm, fxm, error));
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
            	iteracion.add("Aproximación");
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
         
        //imprimirTabla(res);
        return res;

    }

    public void imprimirTabla(List<List<Object>> outer){
        int lenOuter = outer.size();
        Object[][] table = new Double[lenOuter][];
        
        for (int i = 0; i < lenOuter; i++) {
            List<Object> inner = outer.get(i);
            table[i] = new Object[] {inner.get(0), inner.get(1), inner.get(2), inner.get(3), inner.get(4), inner.get(5)};
        }
        
        Object[] titulos = {"i", "xInf", "xSup", "xMed", "f(xMed)", "Error"};
        System.out.format("%2s%17s%17s%17s%26s%20s\n\n", titulos);
     
        
        for (final Object[] row : table) {
            System.out.format("%2s%17s%17s%17s%26s%20s\n", row);
        }
    }


    public void controller() throws IOException{
        
        System.out.print("f(x) = ");
        String fx = br.readLine();

        System.out.print("xi = ");
        String xiStr = br.readLine();
        double xi = Double.parseDouble(xiStr);

        System.out.print("xs = ");
        String xsStr = br.readLine();   
        double xs = Double.parseDouble(xsStr);        

        System.out.print("tolerancia = ");
        String toleStr = br.readLine();
        double tole = Double.parseDouble(toleStr);
        
        System.out.print("Num. Iteraciones = ");
        String niterStr = br.readLine();
        int niter = Integer.parseInt(niterStr);

        System.out.println("\n");
        calculate(fx, xi, xs, tole, niter);        
    }


	@Override
	public String getName() {
		return "Biseccion";
	}
}