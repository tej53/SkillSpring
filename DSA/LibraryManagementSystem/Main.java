package LibraryManagementSystem;

class Main {
    public static void main(String[] args) {
        Library library = new Library(10);
        
        library.addBook(new Book(101, "Java", "Manudeep"));
        library.addBook(new Book(102, "Python", "Tharun"));
        library.addBook(new Book(103, "C++", "Vijay"));
        library.addBook(new Book(104, "DSA", "Pawan"));

        System.out.println("Books in Library");
        System.out.println("-----------------------------");
        library.displayBooks();

        System.out.println("Linear Search");
        System.out.println("-----------------------------");

        Book book1 = library.linearSearch("Java");

        if(book1 != null){
            book1.display();
        }else{
            System.out.println("Book not found");
        }

        library.sortBooks();

        System.out.println();
        System.out.println("Binary Search");
        System.out.println("-----------------------");

        Book book2 = library.binarySearch("Python");

        if(book2 != null){
            book2.display();
        }else{
            System.out.println("Book not found");
        }
    }
}
