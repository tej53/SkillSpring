package com.library.service;

import java.util.List;

public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    // Setter method for Dependency Injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void displayBooks() {
        List<String> books = bookRepository.getBooks();
        System.out.println("Available Books in Library:");
        for (String book : books) {
            System.out.println("  - " + book);
        }
    }

    @Override
    public void searchBook(String title) {
        String result = bookRepository.findBookByTitle(title);
        System.out.println("Search Result: " + result);
    }
}

interface BookRepository {
    List<String> getBooks();
    String findBookByTitle(String title);
}
