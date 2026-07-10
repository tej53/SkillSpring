package com.library;

import com.library.repository.BookRepository;
import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {

    public static void main(String[] args) {
        // Load the Spring application context
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("=== Exercise 1: Configuring a Basic Spring Application ===\n");

        // Retrieve beans from the context
        BookService bookService = (BookService) context.getBean("bookService");
        BookRepository bookRepository = (BookRepository) context.getBean("bookRepository");

        System.out.println("BookService bean retrieved: " + bookService);
        System.out.println("BookRepository bean retrieved: " + bookRepository);

        System.out.println("\nSpring Application Context loaded successfully!");
        System.out.println("Beans are configured and ready to use.");

        // Close the context
        ((ClassPathXmlApplicationContext) context).close();
    }
}
