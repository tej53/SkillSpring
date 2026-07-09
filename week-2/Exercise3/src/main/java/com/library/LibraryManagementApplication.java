package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {

    public static void main(String[] args) {
        // Load the Spring application context
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("=== Exercise 3: Implementing Logging with Spring AOP ===\n");

        // Retrieve the BookService bean
        BookService bookService = (BookService) context.getBean("bookService");

        // Call methods - AOP LoggingAspect will log execution times
        System.out.println("--- Calling displayBooks() ---");
        bookService.displayBooks();

        System.out.println("\n--- Calling searchBook() ---");
        bookService.searchBook("Effective Java");

        System.out.println("\nObserve the [LOG] messages above showing method execution times.");

        // Close the context
        ((ClassPathXmlApplicationContext) context).close();
    }
}
