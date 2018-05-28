package co.edu.eafit.interpolation;

import co.edu.eafit.MethodFactory;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class Vandermonde implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] puntos = (double[][]) args[0];

		int n = puntos.length;
		double[][] matrizVandermonde = new double[n][n];

		for (int i = 0; i < puntos.length; i++) {
			double x = puntos[i][0];
			double[] fila = generarEcuacion(x, n);
			matrizVandermonde[i] = fila;
		}

		double[] b = new double[n];
		for (int i = 0; i < b.length; i++) {
			b[i] = puntos[i][1];
		}


		NumericMethod gaussianElimination = MethodFactory.createMethod("eliminacion pivoteo total");
		Solution sol = gaussianElimination.calculate(matrizVandermonde, b);

		double[] x = (double[]) sol.getSolution();

		String polinomio = generarPolinomio(x);

		return new InterpolationSolution(polinomio);
	}

	private String generarPolinomio(double[] coeficientes) {
		int n = coeficientes.length;
		String polinomio = "p(x) = ";
		for (int i = 0; i < coeficientes.length - 1 ; i++) {
			if (coeficientes[i] == 0.0) {
				continue;
			}
			polinomio += coeficientes[i] + "x^"+ (n-i-1) + " + ";
		}
		polinomio += coeficientes[n-1];
		return polinomio;
	}

	private double[] generarEcuacion(double x, int n) {
		double[] coeficientes = new double[n];
		for (int i = n-1; i >= 0; i--) {
			coeficientes[n-i-1] = Math.pow(x, i);
		}

		return coeficientes;
	}

	@Override
	public String getName() {
		return "Matriz de vandermonde";
	}

}
