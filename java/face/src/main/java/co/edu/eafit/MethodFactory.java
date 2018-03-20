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
    	}else{
            return new NotImplementedMethod();
        }
    }
}