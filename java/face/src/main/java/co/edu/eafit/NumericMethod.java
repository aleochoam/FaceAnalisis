package co.edu.eafit;


public interface NumericMethod {
    public Solution calculate(Object... args);
    public String getName();
}

class NotImplementedMethod implements NumericMethod{

	@Override
	public Solution calculate(Object... args) {
		throw new RuntimeException("Not implemented/Not recognized");
	}

	@Override
	public String getName() {
		return "Not implemented/Not recognized";
	}
	
}