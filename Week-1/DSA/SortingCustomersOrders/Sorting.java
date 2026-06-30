package SortingCustomersOrders;
class Sorting {
    public static void bubbleSort(Orders orders[]){
        for(int i=0;i<orders.length;i++){
            for(int j=0;j<orders.length-i-1;j++){
                if(orders[j].totalPrice > orders[j+1].totalPrice){
                    Orders temp = orders[j];
                    orders[j] = orders[j+1];
                    orders[j+1] = temp;
                }
            }
        }
    }

    public static void insertionSort(Orders orders[]){
        for(int i=1;i<orders.length;i++){
            Orders key = orders[i];

            int j = i-1;
            while(j>=0 && orders[j].totalPrice > key.totalPrice){
                orders[j+1] = orders[j];
                j--;
            }

            orders[j+1] = key;
        }
    }

    public static void quickSort(Orders orders[], int low, int high){
        if(low < high){
            int pi = partition(orders, low, high);
            quickSort(orders, low, pi-1);
            quickSort(orders, pi+1, high);
        }
    }

    public static int partition(Orders orders[], int low, int high){
        double pivot = orders[high].totalPrice;

        int i = low - 1;

        for(int j=low;j<high;j++){
            if(orders[j].totalPrice < pivot){
                i++;

                Orders temp = orders[i];
                orders[i] = orders[j];
                orders[j] = temp;
            }
        }

        Orders temp = orders[i+1];
        orders[i+1] = orders[high];
        orders[high] = temp;

        return i+1;
    }
}
