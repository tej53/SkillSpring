package DesignPrinciples.ObserverPattern;

public class ObserverPatternDemo {

    public static void main(String[] args) {

        StockMarket stockMarket = new StockMarket();

        Observer mobile = new MobileApp();
        Observer web = new WebApp();

        stockMarket.registerObserver(mobile);
        stockMarket.registerObserver(web);

        stockMarket.setStock("TCS", 3850.50);

        stockMarket.setStock("Infosys", 1675.25);

    }

}
