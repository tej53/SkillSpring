package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {

    private BookRepository bookRepository;

    public void displayBooks() {
        if (bookRepository != null) {
            List<String> books = bookRepository.getBooks();
            System.out.println("Available Books:");
            for (String book : books) {
                System.out.println("  - " + book);
            }
        } else {
            System.out.println("BookRepository is not configured.");
        }
    }

    public BookRepository getBookRepository() {
        return bookRepository;
    }

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
}
