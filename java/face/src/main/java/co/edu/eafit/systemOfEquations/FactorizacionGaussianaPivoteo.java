package co.edu.eafit.systemOfEquations;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class FactorizacionGaussianaPivoteo implements NumericMethod {
	
	private double[][] U;
	private double[][] L;
	private double[][] P;

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;

		if(!MatrixUtils.esInvertible(A)) {
			return new SystemOfEquationsSolution("La matriz no es invertible");
		}
		
		try {
			factorizar(A);	
		}catch (RuntimeException e) {
			return new SystemOfEquationsSolution(e.getMessage());
		}
		
		double[] Bn = MatrixUtils.matmul(P, b);
		
		double[] z = MatrixUtils.sustitucionProgresiva(L, Bn);
		double[] x = MatrixUtils.sustitucionRegresiva(U, z);
		
		return new SystemOfEquationsSolution(x);

	}
	
	private void factorizar(double[][] A) {
		int n = A.length;
		P = MatrixUtils.identidad(n);
		L = new double[n][n];
		
		for (int k = 0; k < n; k++) {
			pivoteo(A, k);
			for (int i = k+1; i < n; i++) {
				double mult = A[i][k]/A[k][k];
				if (i>k) {
					L[i][k] = mult;
				}
				for (int j = k; j < n; j++) {
					A[i][j] = A[i][j] - mult * A[k][j];
				}
			}
		}
		
		for (int i = 0; i < n; i++) {
			L[i][i] = 1;
		}
		
		U = A;
	}
	
	private double[][] pivoteo(double[][] A, int k) throws RuntimeException{
		int n = A.length;
	    double mayor = Math.abs(A[k][k]);
	    int fila_mayor = k;
	    
	    for (int s = k+1; s < n; s++) {
			if(Math.abs(A[s][k]) > mayor) {
				mayor = Math.abs(A[s][k]);
				fila_mayor = s;
			}
		}
	    
	    if(mayor == 0) {
	    	throw new RuntimeException("El sistema no tiene solución");
	    }else {
	    	if (fila_mayor != k){
	    		A = MatrixUtils.intercambiarFilas(A, fila_mayor, k);
	    		P = MatrixUtils.intercambiarFilas(P, fila_mayor, k);
	    		L = MatrixUtils.intercambiarFilas(L, fila_mayor, k);
	    		
	    	}
	    	
	    	return A;
	    }
	}

	@Override
	public String getName() {
		return "Factorizacion gaussiana con pivoteo";
	}

}
