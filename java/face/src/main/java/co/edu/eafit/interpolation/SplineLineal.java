package co.edu.eafit.interpolation;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class SplineLineal implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] puntos = (double[][]) args[0];
		int n = puntos.length;

		String[] splines = new String[n-1];

		for (int i = 0; i < n-1; i++) {
			String recta = calcularRecta(puntos[i], puntos[i+1]);
			splines[i] = recta;
		}

		String[][] funcion = new String[n-1][2];
		for (int i = 0; i < funcion.length; i++) {
			String[] tramo = new String[2];

			tramo[0] = splines[i];
			tramo[1] = String.format("%.1f <= x <= %.1f", puntos[i][0], puntos[i+1][0]);

			funcion[i] = tramo;
		}

		String strFuncion = InterpolacionUtils.matrizAString(funcion);
		return new InterpolationSolution(strFuncion);
	}

	private String calcularRecta(double[] punto0, double[] punto1) {
		double x0 = punto0[0];
		double x1 = punto1[0];
		double fx0 = punto0[1];
		double fx1 = punto1[1];

		String recta = (fx1 - fx0)/(x1-x0) + "*(x-" + x1 + ")" + " + "+ fx1;

		return recta;
	}


	@Override
	public String getName() {
		return "Spline lineal";
	}

}
