package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {
    private BookRepository bookRepository;

    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void printBooks() {
        List<String> books = bookRepository.findAllBooks();
        System.out.println("Books in Library (Exercise 4):");
        for (String book : books) {
            System.out.println("- " + book);
        }
    }
}
