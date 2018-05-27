package co.edu.eafit.interpolation;

public class InterpolacionUtils {
	public static String matrizAString(String[][] matriz) {
		String result = "";
		for (int i = 0; i < matriz.length; i++) {
			result += matriz[i][0] + " ; " + matriz[i][1];
			result += "\n";
		}
		return result.substring(0, result.length()-1);
	}
}
