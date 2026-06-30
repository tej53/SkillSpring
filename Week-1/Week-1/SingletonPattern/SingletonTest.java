package DesignPrinciples.SingletonPattern;

class SingletonTest {
    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();


        logger1.log("Application Started");
        logger2.log("User Logged In");

        System.out.println();

        if(logger1 == logger2){
            System.out.println("Only one Logger instance exists");
        }else{
            System.out.println("Multiple instances created");
        }

        System.out.println("Logger1 HashCode: " + logger1.hashCode());
        System.out.println("Logger2 HashCode: " + logger2.hashCode());
    }
}
