package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {

    private BookRepository bookRepository;

    // Setter method for Dependency Injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookRepository getBookRepository() {
        return bookRepository;
    }

    public void displayBooks() {
        List<String> books = bookRepository.getBooks();
        System.out.println("Available Books in Library:");
        for (String book : books) {
            System.out.println("  - " + book);
        }
    }

    public void searchBook(String title) {
        String result = bookRepository.findBookByTitle(title);
        System.out.println("Search Result: " + result);
    }
}
