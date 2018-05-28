package co.edu.eafit.interpolation;

import co.edu.eafit.MethodFactory;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class SplineCubico implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[] x = (double[]) args[0];
		double[] y = (double[]) args[1];

		int n = x.length;
		double[] h = new double[n-1];

		for (int i = 0; i < h.length; i++) {
			h[i] = x[i+1] - x[i];
		}

		double[][] A = new double[n-2][n-2];
		double[] B = new double[n-2];
		double[] s = new double[n];

		A[0][0] = 2*(h[0]+h[1]);
		A[0][1] = h[1];
		B[0] = 6*((y[2]-y[1])/h[1] - (y[1]-y[0])/h[0]);

		for (int i = 1; i < n-3; i++) {
			A[i][i-1] = h[i];
			A[i][i] = 2*(h[i]+h[i+1]);
	        A[i][i+1] = h[i+1];
	        B[i] = 6*((y[i+2]-y[i+1])/h[i+1] - (y[i+1]-y[i])/h[i]);
		}

		A[n-3][n-4] = h[n-3];
	    A[n-3][n-3] = 2*(h[n-3]+h[n-2]);
	    B[n-3] = 6*((y[n-1]-y[n-2])/h[n-2] - (y[n-2]-y[n-3])/h[n-3]);

	    NumericMethod gauss = MethodFactory.createMethod("eliminacion pivoteo total");
	    Solution sol = gauss.calculate(A, B);
	    double[] r = (double[]) sol.getSolution();

	    for (int i = 1; i < n-1; i++) {
			s[i] = r[i-1];
		}

	    s[0] = 0;
	    s[n-1] = 0;

	    double[] a = new double[n-1];
	    double[] b = new double[n-1];
	    double[] c = new double[n-1];
	    double[] d = new double[n-1];

	    for (int j = 0; j < n-1; j++) {
	    	a[j] = (s[j+1]-s[j])/(6*h[j]);
	        b[j] = s[j]/2;
	        c[j] = (y[j+1]-y[j])/h[j] - (2*h[j]*s[j]+h[j]*s[j+1])/6;
	        d[j] = y[j];
		}

	    String[][] polinomio = new String[n-1][2];
	    for (int j = 0; j < polinomio.length; j++) {
			String tramo = String.format("%.1f*(x-%.1f)^3+*(x-%.1f)^2+%.1f*(x-%.1f)+%.1f",
					a[j], x[j], b[j], x[j], c[j], x[j], d[j]);

			String dominio = String.format("%.1f <= x <= %.1f", x[j], x[j+1]);

			String[] spline = new String[2];
			spline[0] = tramo;
			spline[1] = dominio;

			polinomio[j] = spline;
		}

	    String respuesta = InterpolacionUtils.matrizAString(polinomio);

		return new InterpolationSolution(respuesta);
	}

	@Override
	public String getName() {
		return "Spline cubico";
	}

}
