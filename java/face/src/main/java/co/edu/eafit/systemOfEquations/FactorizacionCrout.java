package co.edu.eafit.systemOfEquations;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class FactorizacionCrout implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;

		if(!MatrixUtils.esInvertible(A)) {
			return new SystemOfEquationsSolution("La matriz no es invertible");
		}

		double[][] L = MatrixUtils.identidad(n);
		double[][] U = MatrixUtils.identidad(n);

		for (int k = 0; k < n; k++) {
			double suma1 = 0;

			for (int p = 0; p < k; p++) {
				suma1 = suma1 + L[k][p] * U[p][k];
			}

			L[k][k] = A[k][k] - suma1;

			for (int i = k+1; i < n; i++) {
				double suma2 = 0;
				for (int p = 0; p < k; p++) {
					suma2 = suma2 + L[i][p] * U[p][k];
				}
				L[i][k] = (A[i][k] - suma2) / U[k][k];
			}

			for (int j = k+1; j < n; j++) {
				double suma3 = 0;
				for (int p = 0; p < k; p++) {
					suma3 = suma3 + L[k][p] * U[p][j];
				}
				U[k][j] = (A[k][j] - suma3) / L[k][k];
			}
		}

		double[] z = MatrixUtils.sustitucionProgresiva(L, b);
		double[] x = MatrixUtils.sustitucionRegresiva(U, z);
		return new SystemOfEquationsSolution(x);
	}

	@Override
	public String getName() {
		return "Crout";
	}

}
