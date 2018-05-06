package systemOfEquations;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class EliminacionPivoteoParcial implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;
		
		if(!MatrixUtils.esInvertible(A)) {
			return new SystemOfEquationsSolution("La matriz no es invertible");
		}
		
		double[][] augmented = MatrixUtils.aumentarMatriz(A, b);
		
		for (int k = 0; k < n-1; k++) {
			augmented = pivoteoParcial(augmented, k);
			for (int i = k+1; i < n; i++) {
				double mult = augmented[i][k]/augmented[k][k];
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

	private double[][] pivoteoParcial(double[][] augmented, int k) {
		double mayor = Math.abs(augmented[k][k]);
		int filaMayor = k;
		int n = augmented.length;
		
		for (int s = k+1; s < n; s++) {
			if (Math.abs(augmented[s][k]) > mayor){
				mayor = Math.abs(augmented[k][s]);
				filaMayor = s;
			}
		}
		if (mayor == 0) {
			System.err.println("El sistema no tiene solucióon");
		}else {
			if (filaMayor != k) {
				augmented = MatrixUtils.intercambiarFilas(augmented, filaMayor, k);
			}
		}
		return augmented;
	}

	@Override
	public String getName() {
		return "Eliminacion con pivoteo parcial";
	}

}
