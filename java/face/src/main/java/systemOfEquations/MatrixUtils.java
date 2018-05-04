package systemOfEquations;

import java.util.Arrays;
import java.util.List;

public class MatrixUtils {
	public static double determinante(double[][] A) {
		if(A.length == 1) {
			return A[0][0];
		}else{
			double suma = 0;
			int s = 0;
			int n = A.length;
			
			for (int i = 0; i < n; i++) {
				double[][] inner = new double[n-1][n-1];
				for (int a = 1; a < n; a++) {
					for (int b = 0; b < n; b++) {
						if(b<i) {
							inner[a-1][b] = A[a][b];
						}else if(b > i){
							inner[a-1][b-1] = A[a][b];
						}
					}
					
				}
				if (i%2 == 0) {
					s = 1;
				}else {
					s = -1;
				}
				
				suma = suma + s * A[0][i] * determinante(inner);
			}
			return suma;
		}
	}
	
	public static boolean esInvertible(double[][] A) {
		return determinante(A) != 0;
	}
	
	public static double[][] aumentarMatriz(double[][] A, double[] b){
		int n = A.length;
		double[][] augmented = new double[n][n+1];
		
		for (int i = 0; i < augmented.length; i++) {
			for (int j = 0; j < augmented.length; j++) {
				augmented[i][j] = A[i][j];
			}
			augmented[i][n] = b[i];
		}
		return augmented;
	}
}
