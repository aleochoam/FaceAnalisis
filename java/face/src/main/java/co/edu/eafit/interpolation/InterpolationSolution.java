package co.edu.eafit.interpolation;

import co.edu.eafit.Solution;

public class InterpolationSolution implements Solution {
	private String polinomio = "";
	private String error = "";
	
	public InterpolationSolution(String solution, boolean isError) {
		if (isError) {
			this.error = solution;
		}else {
			this.polinomio = solution;
		}
	}

	@Override
	public Object getSolution() {
		return this.polinomio;
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
