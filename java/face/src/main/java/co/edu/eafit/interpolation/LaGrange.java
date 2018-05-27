package co.edu.eafit.interpolation;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class LaGrange implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[] x = (double[]) args[0];
		double[] y = (double[]) args[1];
		
		int n = x.length;
		String[] res = new String[n];
		
		String numerador;
		String denominador;
		String aux;
		
		for (int i = 0; i < n; i++) {
			numerador = "";
			denominador = "";
			
			for (int j = 0; j < res.length; j++) {
				if (j != i) {
					numerador += "(x-" + x[j] + ")*";
					denominador += "(" + x[i] + "-" + x[j] +")*";
				}
			}
			
			numerador = numerador.substring(0, numerador.length()-1);
			denominador= denominador.substring(0, denominador.length()-1);
			
			aux = y[i] + "*" + numerador + "/" + denominador;
			res[i] = aux;
		}
		
		aux = "p(x) = ";
		for (String ecuacion : res) {
			aux += "(" + ecuacion + ")" + "+";
		}
		
		aux = aux.substring(0, aux.length()-1);
		
		return new InterpolationSolution(aux, false);
	}

	@Override
	public String getName() {
		return "Polinomio de LaGrange";
	}

}
