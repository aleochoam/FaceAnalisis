package co.edu.eafit;

import java.util.Collections;
import java.util.List;

public interface NumericMethod {
    public List<List<Object>> calculate(Object... args);
    public String getName();
}

class NotImplementedMethod implements NumericMethod{

	@Override
	public List<List<Object>> calculate(Object... args) {
		return Collections.emptyList();
	}

	@Override
	public String getName() {
		return "Not implemented";
	}
	
}