package com.cognizant.springlearn.controller;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.Country;
import com.cognizant.springlearn.service.CountryService;
import com.cognizant.springlearn.service.exception.CountryNotFoundException;

/**
 * CountryController - REST controller for Country endpoints.
 * Provides endpoints to get a single country or list of all countries.
 */
@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private CountryService countryService;

    /**
     * Constructor with debug logging.
     */
    public CountryController() {
        LOGGER.debug("Inside CountryController Constructor.");
    }

    /**
     * GET /country - Returns India country details.
     * Loads the India bean from Spring XML configuration and returns it as JSON.
     *
     * @return Country object for India
     */
    @RequestMapping("/country")
    public Country getCountryIndia() {
        LOGGER.info("START");
        Country country = countryService.getCountryIndia();
        LOGGER.debug("Country: {}", country.toString());
        LOGGER.info("END");
        return country;
    }

    /**
     * GET /countries - Returns all countries.
     * Loads country list from country.xml and returns as JSON array.
     *
     * @return ArrayList of Country objects
     */
    @GetMapping("/countries")
    public ArrayList<Country> getAllCountries() {
        LOGGER.info("START");
        ArrayList<Country> countries = countryService.getAllCountries();
        LOGGER.debug("Countries: {}", countries.toString());
        LOGGER.info("END");
        return countries;
    }

    /**
     * GET /countries/{code} - Returns a specific country based on country code.
     * The country code is case insensitive.
     *
     * @param code Two-character ISO country code
     * @return Country object matching the code
     * @throws CountryNotFoundException if the country code does not exist
     */
    @GetMapping("/countries/{code}")
    public Country getCountry(@PathVariable String code) throws CountryNotFoundException {
        LOGGER.info("START");
        Country country = countryService.getCountry(code);
        LOGGER.debug("Country: {}", country.toString());
        LOGGER.info("END");
        return country;
    }
}
