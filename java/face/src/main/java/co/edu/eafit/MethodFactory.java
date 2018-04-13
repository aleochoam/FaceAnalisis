package co.edu.eafit;

import nonLinearEcuations.Biseccion;
import nonLinearEcuations.IncrementalSearch;
import nonLinearEcuations.Newton;
import nonLinearEcuations.PuntoFijo;
import nonLinearEcuations.RaicesMultiples;
import nonLinearEcuations.ReglaFalsa;
import nonLinearEcuations.Secante;

public class MethodFactory {
    public static NumericMethod createMethod(String methodName){
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
    	}else{
            return new NotImplementedMethod();
        }
    }
}