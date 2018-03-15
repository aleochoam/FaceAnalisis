package co.edu.eafit;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


public class BusquedasIncrementales {
    private final Evaluator eval;
    private final BufferedReader br;


    public BusquedasIncrementales() {
        eval = new Evaluator();
        br = new BufferedReader(new InputStreamReader(System.in));
    }


    private void algorithm(String fx, double x0, double delta, int niter){
        double fx0, fx1, x1, zero = 0.0;
        int contador;


        fx0 = eval.evaluatorExpression(fx, x0);

        if(fx0 == zero){
            System.out.println(x0 + "es raiz");

        } else {
            x1 = x0 + delta;
            contador = 1;

            fx1 = eval.evaluatorExpression(fx, x1);
            while((fx0 * fx1) > zero && (contador <= niter)){
                x0 = x1;
                fx0 = fx1;
                x1 = x0 + delta;
                fx1 = eval.evaluatorExpression(fx, x1);
                contador = contador + 1;
            }

            if(fx1 == zero){
                System.out.println(x0 + " es raiz");
            }else if ((fx0 * fx1) < 0){
                System.out.println("Hay una raiz entre " + x0 + " y " + x1);
            }else{
                System.out.println("Fracaso en " + niter + " iteraciones");
            }
        }
    }



    public void controller() throws IOException{
        String fx, x0Str, deltaStr;
        double x0, delta;
        int niter;


        System.out.print("f(x) = ");
        fx = br.readLine();

        System.out.print("x0 = ");
        x0Str = br.readLine();
        x0 = Double.parseDouble(x0Str);

        System.out.print("Delta = ");
        deltaStr = br.readLine();
        delta = Double.parseDouble(deltaStr);

        System.out.print("Num. Iteraciones = ");
        niter = br.read();

        algorithm(fx, x0, delta, niter);
    }


}
