package com.cognizant.springlearn.service;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.springlearn.Country;
import com.cognizant.springlearn.service.exception.CountryNotFoundException;

/**
 * CountryService - Service layer for Country operations.
 * Loads country data from Spring XML configuration file (country.xml).
 */
@Service
public class CountryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryService.class);

    /**
     * Returns India country details from Spring XML configuration.
     *
     * @return Country object for India
     */
    public Country getCountryIndia() {
        LOGGER.info("START");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = context.getBean("in", Country.class);
        LOGGER.debug("Country: {}", country.toString());
        LOGGER.info("END");
        return country;
    }

    /**
     * Returns all countries from Spring XML configuration.
     *
     * @return ArrayList of Country objects
     */
    @SuppressWarnings("unchecked")
    public ArrayList<Country> getAllCountries() {
        LOGGER.info("START");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        ArrayList<Country> countries = context.getBean("countryList", ArrayList.class);
        LOGGER.debug("Countries: {}", countries.toString());
        LOGGER.info("END");
        return countries;
    }

    /**
     * Returns a specific country based on country code (case insensitive).
     * Iterates through the country list and performs case insensitive matching.
     *
     * @param code Two-character ISO country code
     * @return Country object matching the code
     * @throws CountryNotFoundException if the country code does not exist in the list
     */
    @SuppressWarnings("unchecked")
    public Country getCountry(String code) throws CountryNotFoundException {
        LOGGER.info("START");
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        ArrayList<Country> countries = context.getBean("countryList", ArrayList.class);

        // Using lambda expression with stream to find country by code (case insensitive)
        Country country = countries.stream()
                .filter(c -> c.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);

        if (country == null) {
            LOGGER.error("Country not found for code: {}", code);
            throw new CountryNotFoundException();
        }

        LOGGER.debug("Country: {}", country.toString());
        LOGGER.info("END");
        return country;
    }
}
