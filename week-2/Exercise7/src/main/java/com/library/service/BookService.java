package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {
    private final BookRepository bookRepository;
    private String libraryName;

    // Constructor Injection
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Setter Injection
    public void setLibraryName(String libraryName) {
        this.libraryName = libraryName;
    }

    public void displayBooks() {
        System.out.println("Welcome to: " + libraryName);
        if (bookRepository == null) {
            System.out.println("BookRepository not injected.");
            return;
        }
        List<String> books = bookRepository.getBooks();
        System.out.println("Available Books (Exercise 7):");
        for (String book : books) {
            System.out.println("- " + book);
        }
    }
}
