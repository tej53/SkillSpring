import java.util.*;

public class Inventory{
    HashMap<Integer, Product> products = new HashMap<>();

    public void addProduct(Product p){
        products.put(p.productId, p);

        System.out.println("Product added successfully");
    }

    public void updateProduct(int id, int quantity, double price){
        if(products.containsKey(id)){
            Product p = products.get(id);

            p.quantity = quantity;
            p.price = price;

            System.out.println("Product Updated");
        }else{
            System.out.println("Product not found");
        }
    }

    public void deleteProduct(int id){
        if(products.containsKey(id)){
            products.remove(id);
            System.out.println("Product Deleted Successfully");
        }else{
            System.out.println("Product Not Found");
        }
    }

    public void displayProducts(){
        for(Product p : products.values()){
            p.display();
            System.out.println();
        }
    }
}