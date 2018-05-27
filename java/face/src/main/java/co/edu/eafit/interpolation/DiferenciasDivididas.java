package co.edu.eafit.interpolation;

import java.util.Arrays;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class DiferenciasDivididas implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] puntos = (double[][]) args[0];
		
		int n = puntos.length;
		double[][] matrix = new double[n][n+1];
		
		// X y diferencia dividida de orden cero
		for (int i = 0; i < matrix.length; i++) {
			matrix[i][0] = puntos[i][0];
			matrix[i][1] = puntos[i][1];
		}
		
		for (int i = 2, k = 1; i < n+1; i++, k++) {
			for (int j = i; j < n+1; j++) {
				double fxK_1 = matrix[j-1-1][i-1];
				double fxK = matrix[j-1][i-1];
				
				double xK_1 = matrix[j-1][0];
				double xK = matrix[j-1-k][0];
				
				matrix[j-1][i] = (fxK - fxK_1)/(xK_1 - xK);
			}
		}
		
		String polinomio = generarPolinomio(matrix, puntos);
		return new InterpolationSolution(polinomio, false);
	}

	private String generarPolinomio(double[][] matrix, double[][] puntos) {
		String polinomio = "p(x) = ";
		
		String[] xs = new String[matrix.length];
		
		for (int i = 0; i < xs.length; i++) {
			xs[i] = "";
		}
		
		for (int i = 0; i < xs.length; i++) {
			if (i != 0) {
				double x = puntos[i-1][0];
				xs[i] = String.format(java.util.Locale.US, "(x - %.1f)", x);	
			}
			
			polinomio += matrix[i][i+1] + Arrays.toString(xs).replaceAll("\\[|\\]|,|\\s", "") + " + ";
		}
		return polinomio.substring(0, polinomio.length()-3); // Para quitar el último +
	}

	@Override
	public String getName() {
		return "Diferencias divididas de newton";
	}

}
