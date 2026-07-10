package com.library.repository;

import java.util.ArrayList;
import java.util.List;

public class BookRepository {
    public List<String> getBooks() {
        List<String> books = new ArrayList<>();
        books.add("Design Patterns: Elements of Reusable Object-Oriented Software");
        books.add("Introduction to Algorithms");
        books.add("Structure and Interpretation of Computer Programs");
        return books;
    }
}
