package com.library.repository;

import java.util.Arrays;
import java.util.List;

public class BookRepository {

    public List<String> getBooks() {
        return Arrays.asList(
            "Spring in Action",
            "Clean Code",
            "Effective Java",
            "Head First Design Patterns",
            "Java Concurrency in Practice"
        );
    }

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
