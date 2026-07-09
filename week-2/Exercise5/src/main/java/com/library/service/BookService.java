package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {
    private BookRepository bookRepository;

    // Setter method for dependency injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void displayBooks() {
        if (bookRepository == null) {
            System.out.println("Error: BookRepository dependency has not been injected.");
            return;
        }
        List<String> books = bookRepository.getBooks();
        System.out.println("Books available (Exercise 5):");
        for (String book : books) {
            System.out.println("- " + book);
        }
    }
}
