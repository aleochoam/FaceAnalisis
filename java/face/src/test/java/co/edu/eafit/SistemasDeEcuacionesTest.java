package co.edu.eafit;

import java.util.Arrays;

import co.edu.eafit.systemOfEquations.MatrixUtils;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class SistemasDeEcuacionesTest extends TestCase {
	
	public SistemasDeEcuacionesTest( String testName ) {
        super( testName );
    }
	
	public static Test suite() {
        return new TestSuite( SistemasDeEcuacionesTest.class );
    }
	
	public void testDeterminante() {
		double[][] matrix = {{1, -3, 2},
	                 		 {5, 6, -1},
	                 		 {4, -1, 3}};
		assertEquals(16.0, MatrixUtils.determinante(matrix));
	}
	
	public void testEliminacionSimple() {
		NumericMethod metodo = MethodFactory.createMethod("eliminacion simple");
		double[][] a = {{14, 6, -2, 3},
                        {3, 15, 2, -5},
                        {-7, 4, -23, 2},
                        {1, -3, -2, 16}};
		double[] b = {12, 32, -24, 14};
		
		double[] expected = {-0.3042712461470717 , 2.4915015411712904 , 1.7062967855570237, 1.5744605900484367};
		Solution actual = metodo.calculate(a, b);
		
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testEliminacionPivoteoParcial() {
		NumericMethod metodo = MethodFactory.createMethod("eliminacion pivoteo parcial");
		double[][] a = {{-7, 2, -3, 4},
                        {5, -1, 14, -1},
                        {1, 9, -7, 13},
                        {-12, 13, -8, -4}};
		double[] b = {-12, 13, 31, -32};
		
		double[] expected = {2.8591626425051024, 0.7481455667844874, 0.08164484492457827, 1.6906954746851197};
		Solution actual = metodo.calculate(a, b);
		
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testEliminacionPivoteoTotal() {
		NumericMethod metodo = MethodFactory.createMethod("eliminacion pivoteo total");
		double[][] a = {{-7, 2, -3, 4},
                        {5, -1, 14, -1},
                        {1, 9, -7, 13},
                        {-12, 13, -8, -4}};
		double[] b = {-12, 13, 31, -32};
		
		double[] expected = {2.859162642505103, 0.7481455667844873, 0.081644844924578, 1.69069547468512};
		Solution actual = metodo.calculate(a, b);
		
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testFactorizacionGaussiana() {
		NumericMethod metodo = MethodFactory.createMethod("factorizacion gaussiana");
		double[][] a = {{-7, 2, -3, 4},
                        {5, -1, 14, -1},
                        {1, 9, -7, 13},
                        {-12, 13, -8, -4}};
		double[] b = {-12, 13, 31, -32};
		
		double[] expected = {2.8591626425051033, 0.7481455667844857, 0.08164484492457792, 1.690695474685121};
		Solution actual = metodo.calculate(a, b);
		
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testFactorizacionPivoteo() {
		NumericMethod metodo = MethodFactory.createMethod("factorizacion gaussiana pivoteo");
		double[][] a = {{-7, 2, -3, 4},
                        {5, -1, 14, -1},
                        {1, 9, -7, 13},
                        {-12, 13, -8, -4}};
		double[] b = {-12, 13, 31, -32};
		
		double[] expected = {2.8591626425051024, 0.7481455667844874, 0.08164484492457827, 1.6906954746851197};
		Solution actual = metodo.calculate(a, b);
		
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testFactorizacionCrout() {
		NumericMethod metodo = MethodFactory.createMethod("crout");
		double[][] a = {{-7, 2, -3, 4},
                        {5, -1, 14, -1},
                        {1, 9, -7, 13},
                        {-12, 13, -8, -4}};
		double[] b = {-12, 13, 31, -32};
		
		double[] expected = {2.859162642505103, 0.748145566784487, 0.08164484492457805, 1.6906954746851206};
		Solution actual = metodo.calculate(a, b);
				
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testFactorizacionDoolittle() {
		NumericMethod metodo = MethodFactory.createMethod("doolittle");
		double[][] a = {{-7, 2, -3, 4},
                        {5, -1, 14, -1},
                        {1, 9, -7, 13},
                        {-12, 13, -8, -4}};
		double[] b = {-12, 13, 31, -32};
		
		double[] expected = {2.8591626425051033, 0.7481455667844857, 0.08164484492457792, 1.690695474685121};
		Solution actual = metodo.calculate(a, b);
				
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testFactorizacionCholesky() {
		NumericMethod metodo = MethodFactory.createMethod("cholesky");
		double[][] a = {{3, -2, -2, -1},
                        {-2, 8, -2, -2},
                        {-2, -2, 4, 2},
                        {-1, -2, 2, 3}};
		double[] b = {1, 1, 1, 1};
		
		double[] expected = {2.180952380952382, 1.1920634920634925, 1.0714285714285718, 1.0158730158730165};
		Solution actual = metodo.calculate(a, b);
				
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testJacobi() {
		NumericMethod metodo = MethodFactory.createMethod("jacobi");
		double[][] a = {{45, 13, -4, 8},
		                {-5, -28, 4, -14},
		                {9, 15, 63, -7},
		                {2, 3, -8, -42}};
		double[] b = {-25, 82, 75, -43};
		double[] x0 = {2, 2, 2, 2};
		
		double[] expected = {0.38479807555812184, -2.9618719236847064, 1.8929335715345124, 0.4700130807539568};
		Solution actual = metodo.calculate(a, b, x0, 1e-5, 100);

		assertFalse(actual.hasError());
		
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testSeidel() {
		NumericMethod metodo = MethodFactory.createMethod("Seidel");
		double[][] a = {{45, 13, -4, 8},
		                {-5, -28, 4, -14},
		                {9, 15, 63, -7},
		                {2, 3, -8, -42}};
		double[] b = {-25, 82, 75, -43};
		double[] x0 = {2, 2, 2, 2};
		
		double[] expected = {0.38480014636707643, -2.961871935180946, 1.892935840287865, 0.4700118515449618};
		Solution actual = metodo.calculate(a, b, x0, 1e-5, 100);

		
		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
	
	public void testSOR() {
		NumericMethod metodo = MethodFactory.createMethod("SOR");
		double[][] a = {{5, 3, 1},
		                {3, 4, -1},
		                {1, -1, 4}};
		double[] b = {24, 30, -24};
		double[] x0 = {0, 0, 0};
		
		double[] expected = {4.75862257343936, 2.2758631448546165, -6.620692597404742};
		Solution actual = metodo.calculate(a, b, x0, 1.45, 1e-5, 100);

		assertFalse(actual.hasError());
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
	}
}
