package com.library.repository;

import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepository {
    public List<String> getBooks() {
        List<String> books = new ArrayList<>();
        books.add("The Pragmative Programmer");
        books.add("Refactoring: Improving the Design of Existing Code");
        books.add("Test Driven Development By Example");
        return books;
    }
}
