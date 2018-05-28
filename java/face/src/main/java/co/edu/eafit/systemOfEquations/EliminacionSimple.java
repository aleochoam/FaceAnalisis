package co.edu.eafit.systemOfEquations;


import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class EliminacionSimple implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;

		if(!MatrixUtils.esInvertible(A)) {
			return new SystemOfEquationsSolution("La matriz no es invertible");
		}

		double[][] augmented = MatrixUtils.aumentarMatriz(A, b);
		for (int k 	= 0; k < n-1; k++) {
			if(augmented[k][k] == 0) {
				int fila = k;
				for (int i = k; i < n; i++) {
					if (augmented[i][k] != 0) {
						fila = i;
						break;
					}
				}
				augmented = MatrixUtils.intercambiarFilas(A, fila, k);
			}

			for (int i = k+1; i < n; i++) {
				double mult = augmented[i][k] / augmented[k][k];
				for (int j = k; j < n+1; j++) {
					augmented[i][j] = augmented[i][j] - mult * augmented[k][j];
				}
			}
		}

		A = MatrixUtils.getA(augmented);
		b = MatrixUtils.getB(augmented);

		double[] x = MatrixUtils.sustitucionRegresiva(A, b);

		return new SystemOfEquationsSolution(x);


	}



	@Override
	public String getName() {
		return "Eliminacion Gaussiana Simple";
	}

}
