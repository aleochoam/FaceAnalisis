package co.edu.eafit;

import nonLinearEcuations.Biseccion;
import nonLinearEcuations.IncrementalSearch;
import nonLinearEcuations.Newton;
import nonLinearEcuations.PuntoFijo;
import nonLinearEcuations.RaicesMultiples;
import nonLinearEcuations.ReglaFalsa;
import nonLinearEcuations.Secante;
import systemOfEquations.EliminacionPivoteoTotal;
import systemOfEquations.EliminacionSimple;
import systemOfEquations.FactorizacionCholesky;
import systemOfEquations.FactorizacionCrout;
import systemOfEquations.FactorizacionDoolittle;
import systemOfEquations.FactorizacionGaussiana;
import systemOfEquations.FactorizacionGaussianaPivoteo;

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
    	}else{
            return new NotImplementedMethod();
        }
    }
}