package co.edu.eafit;

import java.util.Arrays;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import systemOfEquations.MatrixUtils;

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
		
		
		assertEquals(Arrays.toString(expected), Arrays.toString((double[]) actual.getSolution()));
		
		
	}
}
