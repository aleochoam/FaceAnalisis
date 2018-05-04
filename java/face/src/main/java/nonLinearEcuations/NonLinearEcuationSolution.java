package nonLinearEcuations;

import java.util.List;

import co.edu.eafit.Solution;

public class NonLinearEcuationSolution implements Solution {

	private List<List<Object>> solution;
	private String error = "";
	
	
	public NonLinearEcuationSolution(List<List<Object>> solution) {
		this.solution = solution;
	}
	
	public NonLinearEcuationSolution(String error) {
		this.error = error;
	}
	
	@Override
	public Object getSolution() {
		return solution;
	}
	
	public List<Object> getLastIteration() {
		return solution.get(solution.size() - 1);
	}
	
	@Override
	public String toString() {
		return solution.toString();
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
