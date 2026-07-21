package com.cognizant.springlearn;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {
        LOGGER.info("Spring Learn Application - Starting");
        SpringApplication.run(SpringLearnApplication.class, args);
        LOGGER.info("Spring Learn Application - Started");

        SpringLearnApplication app = new SpringLearnApplication();

        // Hands-on 2 - Load SimpleDateFormat from Spring Configuration XML
        app.displayDate();

        // Hands-on 4 & 5 - Load Country from Spring Configuration XML & Scope Demo
        app.displayCountry();

        // Hands-on 6 - Load list of countries from Spring Configuration XML
        app.displayCountries();
    }

    /**
     * Hands-on 2: Load SimpleDateFormat from Spring Configuration XML.
     * Reads the dateFormat bean from date-format.xml and parses a date string.
     */
    public void displayDate() {
        LOGGER.info("START");

        ApplicationContext context = new ClassPathXmlApplicationContext("date-format.xml");
        SimpleDateFormat format = context.getBean("dateFormat", SimpleDateFormat.class);

        try {
            Date date = format.parse("31/12/2018");
            LOGGER.debug("Parsed Date: {}", date.toString());
        } catch (Exception e) {
            LOGGER.error("Error parsing date: {}", e.getMessage());
        }

        LOGGER.info("END");
    }

    /**
     * Hands-on 4 & 5: Load Country from Spring Configuration XML.
     * Demonstrates singleton and prototype scope.
     */
    public void displayCountry() {
        LOGGER.info("START");

        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

        // First bean retrieval
        Country country = context.getBean("country", Country.class);
        LOGGER.debug("Country : {}", country.toString());

        // Hands-on 5: Get country bean reference one more time (Singleton/Prototype scope demo)
        Country anotherCountry = context.getBean("country", Country.class);
        LOGGER.debug("Another Country : {}", anotherCountry.toString());

        // Check if both references point to the same object (Singleton) or different objects (Prototype)
        LOGGER.debug("Are both references same? {}", (country == anotherCountry));

        LOGGER.info("END");
    }

    /**
     * Hands-on 6: Load list of countries from Spring Configuration XML.
     * Reads an ArrayList of Country beans from country.xml and displays them.
     */
    @SuppressWarnings("unchecked")
    public void displayCountries() {
        LOGGER.info("START");

        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        ArrayList<Country> countries = context.getBean("countryList", ArrayList.class);

        for (Country c : countries) {
            LOGGER.debug("Country : {}", c.toString());
        }

        LOGGER.info("END");
    }
}
