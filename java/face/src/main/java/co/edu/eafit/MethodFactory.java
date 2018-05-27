package co.edu.eafit;

import co.edu.eafit.interpolation.Vandermonde;
import co.edu.eafit.nonLinearEcuations.Biseccion;
import co.edu.eafit.nonLinearEcuations.IncrementalSearch;
import co.edu.eafit.nonLinearEcuations.Newton;
import co.edu.eafit.nonLinearEcuations.PuntoFijo;
import co.edu.eafit.nonLinearEcuations.RaicesMultiples;
import co.edu.eafit.nonLinearEcuations.ReglaFalsa;
import co.edu.eafit.nonLinearEcuations.Secante;
import co.edu.eafit.systemOfEquations.EliminacionPivoteoParcial;
import co.edu.eafit.systemOfEquations.EliminacionPivoteoTotal;
import co.edu.eafit.systemOfEquations.EliminacionSimple;
import co.edu.eafit.systemOfEquations.FactorizacionCholesky;
import co.edu.eafit.systemOfEquations.FactorizacionCrout;
import co.edu.eafit.systemOfEquations.FactorizacionDoolittle;
import co.edu.eafit.systemOfEquations.FactorizacionGaussiana;
import co.edu.eafit.systemOfEquations.FactorizacionGaussianaPivoteo;
import co.edu.eafit.systemOfEquations.Jacobi;
import co.edu.eafit.systemOfEquations.SOR;
import co.edu.eafit.systemOfEquations.Seidel;

public class MethodFactory {
    public static NumericMethod createMethod(String methodName){
        //Capitulo soluciion de ecuaciones no lineales
    	if (methodName.toLowerCase().equals("newton")) {
            return new Newton();
        }else if (methodName.toLowerCase().equals("busquedas")) {
        	return new IncrementalSearch();
    	}else if(methodName.toLowerCase().equals("biseccion")) {
    		return new Biseccion();
    	}else if(methodName.toLowerCase().equals("regla falsa")) {
    		return new ReglaFalsa();
    	}else if(methodName.toLowerCase().equals("punto fijo")) {
    		return new PuntoFijo();
    	}else if(methodName.toLowerCase().equals("secante")) {
    		return new Secante();
    	}else if(methodName.toLowerCase().equals("raices multiples")) {
    		return new RaicesMultiples();
    	
    	//Capitulo sistemas de ecuaciones
    	}else if(methodName.toLowerCase().equals("eliminacion simple")) {
    		return new EliminacionSimple();
    	}else if(methodName.toLowerCase().equals("eliminacion pivoteo parcial")) {
    		return new EliminacionPivoteoParcial();
    	}else if(methodName.toLowerCase().equals("eliminacion pivoteo total")) {
    		return new EliminacionPivoteoTotal();
    	}else if(methodName.toLowerCase().equals("factorizacion gaussiana")) {
    		return new FactorizacionGaussiana();
    	}else if(methodName.toLowerCase().equals("factorizacion gaussiana pivoteo")) {
    		return new FactorizacionGaussianaPivoteo();
    	}else if(methodName.toLowerCase().equals("crout")) {
    		return new FactorizacionCrout();
    	}else if(methodName.toLowerCase().equals("doolittle")) {
    		return new FactorizacionDoolittle();
    	}else if(methodName.toLowerCase().equals("cholesky")) {
    		return new FactorizacionCholesky();
    	}else if(methodName.toLowerCase().equals("jacobi")) {
    		return new Jacobi();
    	}else if(methodName.toLowerCase().equals("seidel")) {
    		return new Seidel();
    	}else if(methodName.toLowerCase().equals("sor")) {
    		return new SOR();
    	
    	// Capitulo interpolacion
    	}else if(methodName.toLowerCase().equals("vandermonde")) {
    		return new Vandermonde();
    	}
    	else{
            return new NotImplementedMethod();
        }
    }
}