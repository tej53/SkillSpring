package com.library.repository;

import java.util.ArrayList;
import java.util.List;

public class BookRepository {
    public List<String> getBooks() {
        List<String> books = new ArrayList<>();
        books.add("War and Peace");
        books.add("Crime and Punishment");
        books.add("The Brothers Karamazov");
        return books;
    }
}
