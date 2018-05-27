package co.edu.eafit.systemOfEquations;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class FactorizacionGaussiana implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;
		
		if(!MatrixUtils.esInvertible(A)) {
			return new SystemOfEquationsSolution("La matriz no es invertible");
		}
		
		double[][] augmented = MatrixUtils.aumentarMatriz(A, b);
		double[][] U = new double[n][n];
		double[][] L = MatrixUtils.identidad(n);
		
		for (int k = 0; k < n-1; k++) {
			for (int i = k+1; i < n; i++) {
				double multiplier = augmented[i][k] / augmented[k][k];
				if (i > k) {
					L[i][k] = multiplier;
				}
				for (int j = k; j < n+1; j++) {
					augmented[i][j] = augmented[i][j] - multiplier * augmented[k][j];
				}
			}
		}
		
		U = MatrixUtils.getA(augmented);
		double[] z = MatrixUtils.sustitucionProgresiva(L, b);
		double[] x = MatrixUtils.sustitucionRegresiva(U, z);
		
		return new SystemOfEquationsSolution(x);
	}

	@Override
	public String getName() {
		return "Factorizacion Gaussiana Simple";
	}

}
