package co.edu.eafit.systemOfEquations;


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
	
	public static double[] sustitucionRegresiva(double[][] matriz, double[] vector) {
		int n = matriz.length;
		double[] x = new double[n];
		
		x[n-1] = vector[n-1]/matriz[n-1][n-1];
		for (int i = n-2; i >= 0; i--) {
			double suma = 0;
			for (int p = n-1; p > i; p--) {
				suma = suma + matriz[i][p] * x[p];
			}
			x[i] = (vector[i] - suma)/matriz[i][i];
		}
		return x;
	}
	
	public static double[] sustitucionProgresiva(double[][] matriz, double[] vector) {
		int n = matriz.length;
		double[] z = new double[n];
		
		z[0] = vector[0] / matriz[0][0];
		for (int i = 1; i < n; i++) {
			double suma = 0;
			for (int p = 0; p < i; p++) {
				suma += matriz[i][p] * z[p];
			}
			
			z[i] = (vector[i] - suma) / matriz[i][i];
		}
		return z;
	}
	
	public static double[][] intercambiarFilas(double[][] A, int fila, int k){
		double[] tempRow = A[fila];
		A[fila] = A[k];
		A[k] = tempRow;
		
		return A;
	}
	
	public static double[][] intercambiarColumnas(double[][] A, int col, int k){
		for (int i = 0; i < A.length; i++) {
			double temp = A[i][k];
			A[i][k] = A[i][col];
			A[i][col] = temp;
		}
		return A;
	}
	
	public static double[][] getA(double[][] augmented){
		int n = augmented.length;
		double[][] A = new double[n][n];
		
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				A[i][j] = augmented[i][j];
			}
		}
		return A;
		
	}
	
	public static double[] getB(double[][] augmented){
		int n = augmented.length;
		double[] b = new double[n];
		
		for (int i = 0; i < n; i++) {
			b[i] = augmented[i][n];
		}
		return b;
	}
	
	public static double[][] identidad(int n){
		double[][] matrix = new double[n][n];
		
		for (int i = 0; i < matrix.length; i++) {
			matrix[i][i] = 1;
		}
		
		return matrix;
	}
	
	public static boolean tieneCerosEnLaDiagonal(double[][] matriz) {
		for (int i = 0; i < matriz.length; i++) {
			if(matriz[i][i] == 0) {
				return true;
			}
		}
		return false;
	}
	
	public static void imprimir(double[][] A) {
		for (int i = 0; i < A.length; i++) {
			for (int j = 0; j < A[i].length; j++) {
				System.out.print(A[i][j] + ", ");
			}
			System.out.println();
		}
	}
	
	public static void imprimir(double[] b) {
		for (int i = 0; i < b.length; i++) {
			System.out.print(b[i]+ " ");
		}
		System.out.println();
	}
}
