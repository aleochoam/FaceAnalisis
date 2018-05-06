package systemOfEquations;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class EliminacionPivoteoTotal implements NumericMethod {
	
	private double[][] augmented;
	private int[] marcas;

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;
		
		if(!MatrixUtils.esInvertible(A)) {
			return new SystemOfEquationsSolution("La matriz no es invertible");
		}
		
		augmented = MatrixUtils.aumentarMatriz(A, b);
		marcas = new int[n];
		
		for (int i = 0; i < marcas.length; i++) {
			marcas[i] = i;
		}

		
		for (int k 	= 0; k < n-1; k++) {
			pivoteoTotal(n, k);
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
		x =  organizarMarcas(x);
		
				
		return new SystemOfEquationsSolution(x);
	}
	
	private void pivoteoTotal(int n, int k) {
		double mayor = 0;
		int filaMayor = k;
		int colMayor = k;
		
		for (int r = k; r < n; r++) {
			for (int s = k; s < n; s++) {
				if (Math.abs(this.augmented[r][s]) > mayor){
					mayor = Math.abs(this.augmented[r][s]);
					filaMayor = r;
					colMayor = s;
				}
			}
		}
		
		if (mayor == 0) {
			System.err.println("El sistema no tiene solucióon");
		}else {
			if(filaMayor != k) {
				augmented = MatrixUtils.intercambiarFilas(augmented, filaMayor, k);
			}
			if(colMayor != k) {
				augmented = MatrixUtils.intercambiarColumnas(augmented, colMayor, k);
				marcas = intercambiarMarcas(colMayor, k);
			}
		}
	}
	
	private int[] intercambiarMarcas(int i, int j) {
		int temp = marcas[i];
		marcas[i] = marcas[j];
		marcas[j] = temp;
		
		return marcas;
	}
	
	private double[] organizarMarcas(double[] x) {
		double[] xSorted = new double[x.length];
		
		for (int i = 0; i < x.length; i++) {
			int pos = marcas[i];
			xSorted[pos] = x[i];
		}
		
		return xSorted;
	}

	@Override
	public String getName() {
		return "Eliminacion con pivoteo total";
	}

}
