package com.library.repository;

import java.util.Arrays;
import java.util.List;

public class BookRepositoryImpl implements BookRepository {

    @Override
    public List<String> getBooks() {
        // Simulate some processing time
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return Arrays.asList(
            "Spring in Action",
            "Clean Code",
            "Effective Java",
            "Head First Design Patterns",
            "Java Concurrency in Practice"
        );
    }

    @Override
    public String findBookByTitle(String title) {
        List<String> books = getBooks();
        for (String book : books) {
            if (book.equalsIgnoreCase(title)) {
                return book;
            }
        }
        return "Book not found: " + title;
    }
}
