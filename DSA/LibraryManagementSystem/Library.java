package LibraryManagementSystem;
import java.util.*;

class Library {
    Book[] books;
    int count;

    public Library(int size){
        books = new Book[size];
        count = 0;
    }

    public void addBook(Book book){
        if(count<books.length){
            books[count] = book;
            count++;
        }else{
            System.out.println("Library is full");
        }
    }

    public void displayBooks(){
        for(int i=0;i<count;i++){
            books[i].display();
            System.out.println();
        }
    }

    public Book linearSearch(String title){
        for(int i=0;i<count;i++){
            if(books[i].title.equalsIgnoreCase(title)){
                return books[i];
            }
        }

        return null;
    }

    public void sortBooks(){
        Arrays.sort(books, 0, count, Comparator.comparing(book->book.title));
    }

    public Book binarySearch(String title){
        int left = 0;
        int right = count - 1;

        while(left<=right){
            int mid = (left+right)/2;

            int result = books[mid].title.compareToIgnoreCase(title);

            if(result==0){
                return books[mid];
            }else if(result < 0){
                left = mid + 1;
            }else{
                right = mid -1;
            }
        }

        return null;
    }
}
