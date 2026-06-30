class Main {
    public static void main(String args[]){
        Inventory inventory = new Inventory();

        Product p1 = new Product(1001, "Laptop", 10, 50000);
        Product p2 = new Product(1002, "Mobile", 15, 30000);

        inventory.addProduct(p1);
        inventory.addProduct(p2);

        System.out.println("Products list");
        inventory.displayProducts();

        inventory.updateProduct(1002, 13, 25000);
        inventory.displayProducts();

        inventory.deleteProduct(1002);
        inventory.displayProducts();
    }
}
