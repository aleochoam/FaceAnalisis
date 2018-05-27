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
}
