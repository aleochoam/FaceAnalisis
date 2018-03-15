public class Metodos {

    public double f(){
        return 0;
    }

    public void biseccion(double xa, double xb, double tol, int nIter) throws
        Exception{

        double fxa = f(xa):
        double fxb = f(xb);

        if(fxa == 0)
            System.out.println(xa + " es raiz");
        if(fxb == 0)
            System.out.println(xb + " es raiz");

        if (fxa * fxb > 0) {
            System.out.println("EL intervalo es inadecuado");
            throw Exception("Mal intervalo");

        }

        double xm = (xb+xa) / 2;
        double fxm = f(xm);

        int contador = 1;

        double error = tol + 1

        while(error > tol and fxm != 0 and contador < nIter){
            if (fxa * fxm < 0) {
                xb = xm;
                fxb = fxm;
            }else if (fxm*fxb < 0) {
                xa = xm;
                fxa = fxm
            }else{
                System.out.println("Error encontrado");
                throw RuntimeExceptio("Error reasignando intervalo");
            }

            double xAnterior = xm;
            xm = (xa + xb) / 2;
            fxm = f(xm);
            error = Math.abs(xm - xAnterior);
        }

        if(fxm == 0)
            System.out.println(xm + "Es raiz");
        else if (error < tol)
            System.out.println(xḿ + " es aproximación con una toleracia de " + tol);
        else
            System.out.println("El Algoritmo fracasó despues de " + nIter + " iteraciones");
    }
}