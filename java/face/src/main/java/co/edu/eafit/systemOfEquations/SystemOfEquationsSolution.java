package co.edu.eafit.systemOfEquations;


import co.edu.eafit.Solution;

public class SystemOfEquationsSolution implements Solution {
	
	private Object solution;
	private String error = "";
	
	public SystemOfEquationsSolution(Object solution) {
		this.solution = solution;
	}
	
	public SystemOfEquationsSolution(String error) {
		this.solution = null;
		this.error = error;
	}

	@Override
	public Object getSolution() {
		return this.solution;
	}

	@Override
	public boolean hasError() {
		return !this.error.equals("");
	}

	@Override
	public String getError() {
		return this.error;
	}
	
	
	
	


}
