package co.edu.eafit.interpolation;

import co.edu.eafit.Solution;

public class InterpolationSolution implements Solution {
	private String polinomio = "";
	
	public InterpolationSolution(String solution) {
		this.polinomio = solution;
	}

	@Override
	public Object getSolution() {
		return this.polinomio;
	}

	@Override
	public boolean hasError() {
		return false;
	}

	@Override
	public String getError() {
		return "";
	}

}
