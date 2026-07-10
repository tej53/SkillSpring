package com.library.repository;

import java.util.List;

public interface BookRepository {
    List<String> getBooks();
    String findBookByTitle(String title);
}
