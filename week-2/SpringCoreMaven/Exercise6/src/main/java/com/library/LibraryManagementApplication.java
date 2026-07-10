package com.library;

import com.library.service.BookService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        // Load the context
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        // Retrieve the BookService bean (resolved by Spring's component scanning)
        BookService bookService = context.getBean(BookService.class);

        // Verify operations
        bookService.displayBooks();

        // Close context
        ((ClassPathXmlApplicationContext) context).close();
    }
}
