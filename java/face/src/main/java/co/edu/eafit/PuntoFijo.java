package co.edu.eafit;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.Math;


public class PuntoFijo {
    private final Evaluator eval;
    private final BufferedReader br;


    public PuntoFijo() {
        eval = new Evaluator();
        br = new BufferedReader(new InputStreamReader(System.in));
    }


    private void algorithm(String fx,String gx, double x0,double tole ,double niter){

        double feval,error, contador, xn;
        feval = this.eval.evaluatorExpression(fx,x0);
      	contador = 0.0;
      	error = tole +1;

      	while(feval != 0 && error > tole && contador < niter){

          	xn = this.eval.evaluatorExpr(gx,x0);
          	feval = this.eval.evaluatorExpr(fx,xn);
          	error = Math.abs(xn-x0);
          	x0 = xn;

      	}
      	if(feval == 0){
      	  System.out.println(x0 + " es raiz");

      	}else if (error < tole){
      		System.out.println(x0 + " Es una aproximacion con una tolerancia " + tole);

      	}else{
      	  System.out.println("Método fracaso en " + niter + " Iteraciones");

      	}


    }






}
