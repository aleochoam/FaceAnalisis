package co.edu.eafit;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import java.util.List;

import co.edu.eafit.MethodFactory;
import co.edu.eafit.NumericMethod;

public class AppTest extends TestCase {

    public AppTest( String testName ) {
        super( testName );
    }


    public static Test suite() {
        return new TestSuite( AppTest.class );
    }

    public void testEvaluator() {
    	Evaluator evaluator = new Evaluator();
    	double res = evaluator.evalExpr("e^x", 0);
    	assertEquals(res, 1.0);
    }

    public void testMethodFactoy(){    
    	NumericMethod metodo = MethodFactory.createMethod("Newton");
    	assertTrue (metodo.getName().equals("Newton"));
    }
    
    
    public void testBusquedas() {
    	NumericMethod busquedas = MethodFactory.createMethod("busquedas");
    	List<List<Object>> res = busquedas.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", -10.0, 1.0, 100);
    	assertEquals(res.get(0).get(0), -2.0);
    	assertEquals(res.get(0).get(1), -1.0);
    }
    
    public void testBiseccion() {
    	NumericMethod biseccion = MethodFactory.createMethod("biseccion");
    	List<List<Object>> res = biseccion.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", 2.0, 3.0, 0.5e-3, 100);
    	assertEquals(res.get(10).get(3), 2.36962890625);
    }

    public void testNewton() {
    	NumericMethod newton = MethodFactory.createMethod("Newton");
    	List<List<Object>> res = newton.calculate("x*e^x - x^2-5*x-3", "x*e^x+e^x-2*x-5", -4.5, 1e-7, 100);
        assertEquals(res.get(4).get(1), -4.286348515427084);
    }
}
