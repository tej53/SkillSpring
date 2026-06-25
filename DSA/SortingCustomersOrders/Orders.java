package SortingCustomersOrders;

class Orders {
    int orderId;
    String customerName;
    double totalPrice;
    
    public Orders(int orderId, String customerName, double totalPrice){
        this.orderId = orderId;
        this.customerName = customerName;
        this.totalPrice = totalPrice;
    }

    public void display(){
        System.out.println(
            "Order Id : " + orderId + "\n" +
            "Customer Name : " + customerName + "\n" +
            "Total Price : " + totalPrice
        );
    }
}
