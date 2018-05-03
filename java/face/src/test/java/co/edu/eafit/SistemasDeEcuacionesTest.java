package co.edu.eafit;

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
		int n = 4;
		double[][] a = {{-1, 3, 2},
                        {2, -5, 1},
                        {3, 1, -6}};
		double[] b = {12, -10, 4};
		
		double[] expected = {-0.304271246, 2.49, 1.70, 1.57};
		Solution actual = metodo.calculate(a, b);
		
		
		assertTrue(expected.equals(actual));
		
		
	}
}
