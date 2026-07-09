package com.library.repository;

import java.util.ArrayList;
import java.util.List;

public class BookRepository {
    public List<String> findAllBooks() {
        List<String> books = new ArrayList<>();
        books.add("The Hobbit");
        books.add("1984");
        books.add("To Kill a Mockingbird");
        return books;
    }
}
