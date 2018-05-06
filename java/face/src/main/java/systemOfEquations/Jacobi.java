package systemOfEquations;


import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class Jacobi implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		double[] x0 = (double[]) args[2];
		double tolerancia = (Double) args[3];
		int iteraciones = (Integer) args[4];
		
		if(MatrixUtils.tieneCerosEnLaDiagonal(A)) {
			return new SystemOfEquationsSolution("La matriz contiene ceros en la diagonal");
		}
		
		int contador = 0;
		double dispersion = tolerancia + 1;
		double[] x1 = new double[x0.length];
		
		while(dispersion > tolerancia && contador < iteraciones) {
			x1 = calcularNuevaX(A, b, x0);
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

	private double[] calcularNuevaX(double[][] A, double[] b, double[] x0) {
		int n = x0.length;
		double[] x1 = new double[n];
		
		for (int i = 0; i < n; i++) {
			double suma = 0;
			for (int j = 0; j < n; j++) {
				if (j != i) {
					suma = suma + A[i][j] * x0[j];
				}
			}
			x1[i] = (b[i] - suma)/A[i][i];
		}
		return x1;
	}

	@Override
	public String getName() {
		return "Metodo de Jacobi";
	}

}
