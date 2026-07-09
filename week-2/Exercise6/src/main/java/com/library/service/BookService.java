package com.library.service;

import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {
    private BookRepository bookRepository;

    // Autowire the BookRepository dependency via setter injection
    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void displayBooks() {
        if (bookRepository == null) {
            System.out.println("Error: BookRepository dependency has not been autowired.");
            return;
        }
        List<String> books = bookRepository.getBooks();
        System.out.println("Books available (Exercise 6 - Annotation Config):");
        for (String book : books) {
            System.out.println("- " + book);
        }
    }
}
