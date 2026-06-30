package SortingCustomersOrders;
public class Main {
    public static void main(String[] args) {
        Orders orders[] = {
            new Orders(101, "Tej", 5000),
            new Orders(102, "Rahul", 2000),
            new Orders(103, "Siddu", 50000),
            new Orders(104, "Kalyani", 20000)
        };

        System.out.println("Before Sorting: ");
        for(Orders o : orders){
            o.display();
            System.out.println();
        }

        System.out.println("After Sorting: ");
        // Sorting.bubbleSort(orders);
        // for(Orders o : orders){
        //     o.display();
        //     System.out.println();
        // }

        // Sorting.insertionSort(orders);
        // for(Orders o : orders){
        //     o.display();
        //     System.out.println();
        // }

        Sorting.quickSort(orders, 0, orders.length-1);
        for(Orders o : orders){
            o.display();
            System.out.println();
        }
    }
}
