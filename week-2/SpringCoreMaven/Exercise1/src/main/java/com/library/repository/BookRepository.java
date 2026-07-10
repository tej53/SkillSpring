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
}
