package co.edu.eafit;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import java.util.List;

import co.edu.eafit.MethodFactory;
import co.edu.eafit.NumericMethod;
import co.edu.eafit.nonLinearEcuations.NonLinearEcuationSolution;

public class EcuacionesNoLinealesTest extends TestCase {

    public EcuacionesNoLinealesTest( String testName ) {
        super( testName );
    }


    public static Test suite() {
        return new TestSuite( EcuacionesNoLinealesTest.class );
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
    
   
    public void testBusquedas() {
    	NumericMethod busquedas = MethodFactory.createMethod("busquedas");
    	Solution res = busquedas.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", -10.0, 1.0, 100);
    	
    	@SuppressWarnings("unchecked")
		List<List<Object>> res_iterations = (List<List<Object>>) res.getSolution();
    	assertEquals(-2.0, res_iterations.get(0).get(0));
    	assertEquals(-1.0, res_iterations.get(0).get(1));
    }
    
    public void testBiseccion() {
    	NumericMethod biseccion = MethodFactory.createMethod("biseccion");
    	NonLinearEcuationSolution res = (NonLinearEcuationSolution) biseccion.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", 2.0, 3.0, 0.5e-3, 100);
    	assertEquals(2.36962890625, res.getLastIteration().get(3));
    }
    
    public void testReglaFija() {
    	NumericMethod reglaFalsa = MethodFactory.createMethod("regla falsa");
    	NonLinearEcuationSolution res = (NonLinearEcuationSolution) reglaFalsa.calculate("e^(3*x-12)+x*cos(3*x)-x^2+4", 2.0, 3.0, 0.5e-3, 100);
    	assertEquals(2.369475259916648, res.getLastIteration().get(3));
    }
    
    public void testPuntoFijo() {
    	NumericMethod puntoFijo = MethodFactory.createMethod("punto fijo");
    	NonLinearEcuationSolution res = (NonLinearEcuationSolution) puntoFijo.calculate("(x*e^x - x^2-3)/5", -0.5, 5e-5, 100);
        assertEquals(-0.7998235074870936 ,res.getLastIteration().get(1));
        
    }

    public void testNewton() {
    	NumericMethod newton = MethodFactory.createMethod("Newton");
    	NonLinearEcuationSolution res = (NonLinearEcuationSolution) newton.calculate("x*e^x - x^2-5*x-3", "x*e^x+e^x-2*x-5", -4.5, 1e-7, 100);
        assertEquals(-4.286348515427084, res.getLastIteration().get(1));
    }
    
    public void testSecante() {
    	NumericMethod secante = MethodFactory.createMethod("secante");
    	NonLinearEcuationSolution res = (NonLinearEcuationSolution) secante.calculate("x^2 - 3", 2.0, 3.0, 1e-5, 100);
    	assertEquals(1.7320525783619818, res.getLastIteration().get(1));
    }
    
    public void testNewton2() {
    	NumericMethod newton2 = MethodFactory.createMethod("raices multiples");
    	NonLinearEcuationSolution res = (NonLinearEcuationSolution) newton2.calculate("x^3", "3*x^2", "6*x", 1.0, 1e-5, 100);
    	assertEquals(0.0, res.getLastIteration().get(1));
    }
}
