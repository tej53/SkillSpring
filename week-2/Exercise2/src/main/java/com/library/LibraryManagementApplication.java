package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {

    public static void main(String[] args) {
        // Load the Spring application context
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("=== Exercise 2: Implementing Dependency Injection ===\n");

        // Retrieve the BookService bean (BookRepository is injected via setter DI)
        BookService bookService = (BookService) context.getBean("bookService");

        // Verify that dependency injection worked
        if (bookService.getBookRepository() != null) {
            System.out.println("Dependency Injection successful! BookRepository is injected into BookService.\n");
        } else {
            System.out.println("Dependency Injection failed! BookRepository is null.\n");
        }

        // Use the service to display books
        bookService.displayBooks();

        System.out.println();

        // Search for a book
        bookService.searchBook("Clean Code");
        bookService.searchBook("Unknown Book");

        // Close the context
        ((ClassPathXmlApplicationContext) context).close();
    }
}
