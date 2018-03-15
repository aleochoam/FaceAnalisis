package co.edu.eafit;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;


public class Evaluator {

    public Evaluator() {
    }
    
    
    
    public double evaluatorExpression(String function, double x){
        try{
            Expression exp = new ExpressionBuilder(function)
               .variables("x")
               .build()
               .setVariable("x", x);
            return exp.evaluate();
                 
        }catch(Exception e){
            System.out.println("Invalid Expression");
            System.exit(0);
        }
        
        return -1;
    }
    
}
