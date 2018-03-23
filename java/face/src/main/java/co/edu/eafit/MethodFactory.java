package co.edu.eafit;

import co.edu.eafit.Newton;

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