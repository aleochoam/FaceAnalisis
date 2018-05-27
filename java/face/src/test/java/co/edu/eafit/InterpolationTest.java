package co.edu.eafit;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class InterpolationTest extends TestCase {
	public InterpolationTest( String testName ) {
        super( testName );
    }
	
	public static Test suite() {
        return new TestSuite( InterpolationTest.class );
    }
	
	public void testVandermonde() {
		NumericMethod method = MethodFactory.createMethod("vandermonde");
		double[][] points = {{1.0, 1.0},
						     {2.0, 2.0},
 						     {3.0, 3.0},
 						     {4.0, 4.0}};
		
		Solution actual = method.calculate(points);
		String expected = "p(x) = 1.0x^1 + 0.0";
		
		assertFalse(actual.hasError());
		assertEquals(expected, (String) actual.getSolution());
	}
	
	public void testDiferenciasDivididas() {
		NumericMethod method = MethodFactory.createMethod("diferencias divididas");
		double[][] points = {{2, 1.5},
					         {3, 7},
					         {4, 2}};

		Solution actual = method.calculate(points);
		String expected = "p(x) = 1.5 + 5.5(x-2.0) + -5.25(x-2.0)(x-3.0)";
		
		assertFalse(actual.hasError());
		assertEquals(expected, (String) actual.getSolution());
	}
	
	public void testLaGrange() {
		NumericMethod method = MethodFactory.createMethod("lagrange");
		double[] x = {-1, 1, 2, 4};
		double[] y = {7, -1, -8, 2};

		Solution actual = method.calculate(x, y);
		String expected = "p(x) = (7.0*(x-1.0)*(x-2.0)*(x-4.0)/(-1.0-1.0)*(-1.0-2.0)*(-1.0-4.0))+(-1.0*(x--1.0)*"
				+ "(x-2.0)*(x-4.0)/(1.0--1.0)*(1.0-2.0)*(1.0-4.0))+(-8.0*(x--1.0)*(x-1.0)*(x-4.0)/(2.0--1.0)*(2.0-1.0)"
				+ "*(2.0-4.0))+(2.0*(x--1.0)*(x-1.0)*(x-2.0)/(4.0--1.0)*(4.0-1.0)*(4.0-2.0))";
		
		assertFalse(actual.hasError());
		assertEquals(expected, (String) actual.getSolution());
	}
	
	public void testLinealSplines() {
		NumericMethod method = MethodFactory.createMethod("spline lineal");
		double[][] points = {{0.0, 0.0},
			     			  {1.0, 1.0},
 						      {2.0, 2.0},
						      {3.0, 3.0}};

		Solution actual = method.calculate(points);
		String expected = "1.0*(x-1.0) + 1.0 ; 0,0 <= x <= 1,0\n" + 
						  "1.0*(x-2.0) + 2.0 ; 1,0 <= x <= 2,0\n" + 
						  "1.0*(x-3.0) + 3.0 ; 2,0 <= x <= 3,0";
		
		assertFalse(actual.hasError());
		assertEquals(expected, (String) actual.getSolution());
	}
}
