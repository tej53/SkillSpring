package com.library;

import com.library.entity.Book;
import com.library.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LibraryManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
    }

    // Prepopulate DB with some initial books for testing
    @Bean
    public CommandLineRunner initDatabase(BookRepository repository) {
        return args -> {
            repository.save(new Book("The Lord of the Rings", "J.R.R. Tolkien", "978-0618640157"));
            repository.save(new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084"));
            repository.save(new Book("1984", "George Orwell", "978-0451524935"));
            System.out.println("Database pre-populated with books!");
        };
    }
}
