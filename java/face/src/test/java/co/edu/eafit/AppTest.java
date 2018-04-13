package co.edu.eafit;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

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
    	assertEquals(1.0, res);
    }

    public void testMethodFactoy(){    
    	NumericMethod metodo = MethodFactory.createMethod("Newton");
    	assertTrue (metodo.getName().equals("Newton"));
    }
    
   /*
    public void testBusquedas() {
    	NumericMethod busquedas = MethodFactory.createMethod("busquedas");
    	Solution res = busquedas.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", -10.0, 1.0, 100);
    	assertEquals(-2.0, res.getSolution().get);
    	assertEquals(-1.0, res.getLastIteration());
    }*/
    
    public void testBiseccion() {
    	NumericMethod biseccion = MethodFactory.createMethod("biseccion");
    	Solution res = biseccion.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", 2.0, 3.0, 0.5e-3, 100);
    	assertEquals(2.36962890625, res.getLastIteration().get(3));
    }
    
    public void testReglaFija() {
    	NumericMethod reglaFalsa = MethodFactory.createMethod("regla falsa");
    	Solution res = reglaFalsa.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", 2.0, 3.0, 0.5e-3, 100);
    	assertEquals(2.369475259916648, res.getLastIteration().get(3));
    }
    
    public void testPuntoFijo() {
    	NumericMethod puntoFijo = MethodFactory.createMethod("punto fijo");
    	Solution res = puntoFijo.calculate("(x*e^x - x^2-3)/5", -0.5, 5e-5, 100);
        assertEquals(-0.7998235074870936 ,res.getLastIteration().get(1));
        
    }

    public void testNewton() {
    	NumericMethod newton = MethodFactory.createMethod("Newton");
    	Solution res = newton.calculate("x*e^x - x^2-5*x-3", "x*e^x+e^x-2*x-5", -4.5, 1e-7, 100);
        assertEquals(-4.286348515427084, res.getLastIteration().get(1));
    }
    
    public void testSecante() {
    	NumericMethod secante = MethodFactory.createMethod("secante");
    	Solution res = secante.calculate("x^2 - 3", 2.0, 3.0, 1e-5, 100);
    	assertEquals(1.7320525783619818, res.getLastIteration().get(1));
    }
    
    public void testNewton2() {
    	NumericMethod newton2 = MethodFactory.createMethod("raices multiples");
    	Solution res = newton2.calculate("x^3", "3*x^2", "6*x", 1.0, 1e-5, 100);
    	assertEquals(0.0, res.getLastIteration().get(1));
    }
}
