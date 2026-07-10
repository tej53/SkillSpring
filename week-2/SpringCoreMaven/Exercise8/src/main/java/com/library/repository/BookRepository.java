package com.library.repository;

import java.util.ArrayList;
import java.util.List;

public class BookRepository {
    public List<String> getBooks() {
        List<String> books = new ArrayList<>();
        books.add("Brave New World");
        books.add("Fahrenheit 451");
        return books;
    }
}
