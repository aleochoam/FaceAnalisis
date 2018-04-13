package nonLinearEcuations;

import java.util.List;

import co.edu.eafit.Solution;

public class NonLinearEcuationSolution implements Solution {

	private List<List<Object>> solution;
	
	
	public NonLinearEcuationSolution(List<List<Object>> solution) {
		this.solution = solution;
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

}
