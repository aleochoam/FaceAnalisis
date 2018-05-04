package systemOfEquations;

import systemOfEquations.MatrixUtils.*;

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
		
		A = getA(augmented);
		b = getB(augmented);
		
		double[] x = MatrixUtils.sustitucionRegresiva(A, b);
				
		return new SystemOfEquationsSolution(x);
		
		
	}
	
	private double[][] getA(double[][] augmented){
		int n = augmented.length;
		double[][] A = new double[n][n];
		
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				A[i][j] = augmented[i][j];
			}
		}
		return A;
		
	}
	
	private double[] getB(double[][] augmented){
		int n = augmented.length;
		double[] b = new double[n];
		
		for (int i = 0; i < n; i++) {
			b[i] = augmented[i][n];
		}
		return b;
	}

	@Override
	public String getName() {
		return "Eliminacion Gaussiana Simple";
	}

}
