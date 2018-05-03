package systemOfEquations;

import systemOfEquations.MatrixUtils.*;

import java.util.List;

import co.edu.eafit.NumericMethod;
import co.edu.eafit.Solution;

public class EliminacionSimple implements NumericMethod {

	@Override
	public Solution calculate(Object... args) {
		double[][] A = (double[][]) args[0];
		double[] b = (double[]) args[1];
		int n = A.length;
		
		if(!MatrixUtils.esInvertible(A)) {
			System.out.println("La matriz no es invertible");
			return new SystemOfEquationsSolution();
		}
		
		List<List<double[]>> augmented = MatrixUtils.aumentarMatriz(A, b);
		for (int i = 0; i < augmented.size(); i++) {
			for (int j = 0; j < augmented.get(i).size(); j++) {
				System.out.print(augmented.get(i).get(j));
			}
			System.out.println();
			
		}
		return null;
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}

}
