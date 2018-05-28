package co.edu.eafit.interpolation;

import co.edu.eafit.MethodFactory;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;
import co.edu.eafit.systemOfEquations.MatrixUtils;

public class SplineCuadratico implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] puntos = (double[][]) args[0];
		int n = puntos.length-1;

		int size = n*3;
		double[][] matrix = new double[size][size];
		double[] vector = new double[size];

		int i, j, k;
		i = j = k = 0;

		// Ecuaciones de interpolacion
		while(i < n*2) {
			matrix[i][j+0] = Math.pow(puntos[k][0], 2);
			matrix[i][j+1] = puntos[k][0];
			matrix[i][j+2] = 1;

			matrix[i+1][j+0] = Math.pow(puntos[k+1][0], 2);
			matrix[i+1][j+1] = puntos[k+1][0];
			matrix[i+1][j+2] = 1;

			i += 2;
			j += 3;
			k += 1;
		}

		i = n*2;
		j = 1;
		k = 0;

		// Ecuaciones de sauvidad
		while(i < (n * 3) - 1) {
			matrix[i][k+0] = 2 * puntos[j][0];
			matrix[i][k+1] = 1;

			matrix[i][k+2+1] = -2 * puntos[j][0];
			matrix[i][k+3+1] = -1;

			i += 1;
			j += 1;
			k += 3;
		}

		// Primera derivada cero
		matrix[size - 1][0] = 1;

		// Vector independiete
		vector[0] = puntos[0][1];
		for (i = 1, j = 1; i < n; i++, j+=2) {
			vector[j] = puntos[i][1];
			vector[j+1] = puntos[i][1];
		}
		vector[(int)Math.pow(n, 2) - 1] = puntos[n][1];

		NumericMethod eliminacion = MethodFactory.createMethod("eliminacion pivoteo total");
		Solution sol = eliminacion.calculate(matrix, vector);
		double[] x = (double[])sol.getSolution();

		String ecuacion = generarEcuacion(x, puntos);
		return new InterpolationSolution(ecuacion);
	}

	private String generarEcuacion(double[] coeficientes, double[][] puntos) {
		int n = puntos.length - 1;
		String[][] funcionPartes = new String[n][2];

		for (int i = 0; i < n*3; i+=3) {
			double a = coeficientes[i];
			double b = coeficientes[i+1];
			double c = coeficientes[i+2];

			String funcion = String.format(java.util.Locale.US, "%.1f x^2 + %.1f x + %.1f", a, b, c);

			double x0 = puntos[i/3][0];
			double x1 = puntos[i/3+1][0];

			String dominio = String.format("%.1f <= x <= %.1f", x0, x1);

			String[] tramo = new String[2];
			tramo[0] = funcion;
			tramo[1] = dominio;

			funcionPartes[i/3] = tramo;
		}

		return InterpolacionUtils.matrizAString(funcionPartes);
	}

	@Override
	public String getName() {
		return "Spline cuadratico";
	}

}
