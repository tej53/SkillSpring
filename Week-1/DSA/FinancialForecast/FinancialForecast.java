package FinancialForecast;
class FinancialForecast{
    public static double forecast(double presentValue, double growthRate, int years){
        if(years == 0){
            return presentValue;
        }

        return forecast(presentValue, growthRate, years-1) * (1 + growthRate);
    }

    public static void main(String args[]){
        double presentValue = 10000;
        double growthRate = 0.10; // 10%
        int years = 5;

        double futureValue = forecast(presentValue, growthRate, years);

        System.out.printf("Present Value : %.2f%n", presentValue);
        System.out.printf("Growth Rate   : %.2f%%%n", growthRate * 100);
        System.out.println("Years         : " + years);
        System.out.printf("Future Value  : %.2f%n", futureValue);
    }
}