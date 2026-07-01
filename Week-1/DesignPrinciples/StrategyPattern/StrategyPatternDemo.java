package DesignPrinciples.StrategyPattern;

public class StrategyPatternDemo {

    public static void main(String[] args) {

        PaymentContext payment = new PaymentContext(new CreditCardPayment());

        payment.executePayment(1500);

        payment.setPaymentStrategy(new PayPalPayment());

        payment.executePayment(2500);

    }

}
