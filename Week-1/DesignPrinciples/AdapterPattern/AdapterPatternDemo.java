package DesignPrinciples.AdapterPattern;

public class AdapterPatternDemo {

    public static void main(String[] args) {

        // PayPal Payment
        PaymentProcessor paypal =
                new PayPalAdapter(new PayPalGateway());

        paypal.processPayment(1500);

        // Stripe Payment
        PaymentProcessor stripe =
                new StripeAdapter(new StripeGateway());

        stripe.processPayment(2500);

    }

}