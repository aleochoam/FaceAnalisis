package co.edu.eafit.systemOfEquations;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class SOR implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		double[] x0 = (double[]) args[2];
		double w = (Double) args[3];
		double tolerancia = (Double) args[4];
		int iteraciones = (Integer) args[5];
		
		if(MatrixUtils.tieneCerosEnLaDiagonal(A)) {
			return new SystemOfEquationsSolution("La matriz contiene ceros en la diagonal");
		}
		
		int contador = 0;
		double dispersion = tolerancia + 1;
		double[] x1 = new double[x0.length];
		
		while(dispersion > tolerancia && contador < iteraciones) {
			x1 = calcularNuevaX(A, b, x0, w);
			dispersion = calcularError(x1, x0);
			x0 = x1.clone();
			contador++;
		}
		
		if(dispersion < tolerancia) {
			return new SystemOfEquationsSolution(x1);
		}else {
			return new SystemOfEquationsSolution("El método fracasó en " + iteraciones);
		}
	}
	
	private double[] calcularNuevaX(double[][] A, double[] b, double[] x0, double w) {
		double x1[] = x0.clone();
		int n = x0.length;
		
		for (int i = 0; i < n; i++) {
			double suma1 = 0;
			for (int j = 0; j < i; j++) {
				suma1 = suma1 + A[i][j] * x1[j];
			}
			
			double suma2 = 0;
			for (int j = i+1; j < n; j++) {
				suma2 = suma2 + A[i][j] * x0[j];
			}
			
			double suma = suma1 + suma2;
			x1[i] = (1-w)*x0[i] - w/A[i][i] * suma + w * b[i] / A[i][i];
		}
		return x1;
	}

	private double calcularError(double[] x1, double[] x0) {
		double max = 0;
		for (int i = 0; i < x0.length; i++) {
			double diff = Math.abs(x1[i]-x0[i]); 
			if (max < diff) {
				max = diff;
			}
		}
		return max;
	}

	@Override
	public String getName() {
		return "Metodo de relajación para Seidel";
	}

}
