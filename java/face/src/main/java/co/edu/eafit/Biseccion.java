package co.edu.eafit;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.util.ArrayList;



public class Biseccion {
    private final Evaluator eval;
    private final BufferedReader br;

    public Biseccion() {
        eval = new Evaluator();
        br = new BufferedReader(new InputStreamReader(System.in));        
    }


    private ArrayList completeInner(int cont, double xi, double xs, double xm, double fxm, double error){
        ArrayList<Double> inner = new ArrayList<>(6);
        inner.add((double)cont);
        inner.add(xi);
        inner.add(xs);
        inner.add(xm);
        inner.add(fxm);
        inner.add(error);
        return inner;
    }


    private void algorithm(String fx, double xi, double xs, double tole, double niter){
        ArrayList<ArrayList<Double>> outer = new ArrayList<>();
        
        double fxi, fxs, xm, fxm, error, xaux, zero = 0;
        int contador;
        
        fxi = this.eval.evaluatorExpression(fx, xi);
        fxs = this.eval.evaluatorExpression(fx, xs);

        if (fxi == zero) {
            System.out.println(xi + " Es raiz");
        } else if (fxs == zero) {
            System.out.println(xs + " Es raiz");
        } else if ((fxi * fxs) < 0) {
            xm = (xi + xs) / 2.0;
            fxm = eval.evaluatorExpression(fx, xm);
            contador = 1;
            error = tole + 1;

            outer.add(completeInner(contador, xi, xs, xm, fxm, 0));

            while ((error > tole) && (fxm != 0) && (contador <= niter)){
                if ((fxi * fxm) < 0) {
                    xs = xm;
                    fxs = fxm;
                } else {
                    xi = xm;
                    fxi = fxm;
                }
                xaux = xm;
                xm = (xi + xs) / 2.0;
                fxm = eval.evaluatorExpression(fx, xm);
                error = Math.abs(xm - xaux);
                contador += 1;
                outer.add(completeInner(contador, xi, xs, xm, fxm, error));
            }

            if (fxm == 0) {
                System.out.println(xm + " Es raiz");
            } else if (error < tole){
                System.out.println(xm + " Es una aproximacion a una raiz con una tolerancia = " + tole);
            } else {
                System.out.println("Fracaso en " + niter + " iteraciones");
            }
        } else {
            System.out.println("El intervalo es inadecuado");
        }

        imprimirTabla(outer);

    }

    public void imprimirTabla(ArrayList outer){
        int lenOuter = outer.size();
        Object[][] table = new Double[lenOuter][];
        
        for (int i = 0; i < lenOuter; i++) {
            ArrayList inner = (ArrayList) outer.get(i);
            table[i] = new Double[] {(double) inner.get(0), (double)inner.get(1), (double)inner.get(2), (double)inner.get(3), (double)inner.get(4), (double)inner.get(5)};
        }
        
        System.out.println("i\t\t xInf\t\t xSup\t\t xMed\t\t f(xMed)\t\t Error");       
        
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
        double niter = Double.parseDouble(niterStr);

        algorithm(fx, xi, xs, tole, niter);
    }

}