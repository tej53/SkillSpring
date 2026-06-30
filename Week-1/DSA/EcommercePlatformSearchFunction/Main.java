package EcommercePlatformSearchFunction;

public class Main {
    public static void main(String args[]){
        Product products[] = {
            new Product(101, "Laptop", "Electronics"),
            new Product(102, "Shoes", "Fashion"),
            new Product(103, "Phone", "Electronics"),
            new Product(104, "Shirt", "Fashion")
        };

        Product linearSearch = Search.linearSearch(products, 104);
        
        if(linearSearch != null){
            linearSearch.display();
        }else{
            System.out.println("Product not found");
        }

        System.out.println();

        Product binarySearch = Search.binarySearch(products, 103);

        if(binarySearch!=null){
            binarySearch.display();
        }else{
            System.out.println("Product not found");
        }
    }
}
