package com.cognizant.springlearn.service;

import com.cognizant.springlearn.Country;
import com.cognizant.springlearn.exception.CountryNotFoundException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CountryService {
    private ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");

    public Country getCountry(String code) throws CountryNotFoundException {
        ArrayList<Country> countries = context.getBean("countryList", ArrayList.class);
        for (Country country : countries) {
            if (country.getCode().equalsIgnoreCase(code)) {
                return country;
            }
        }
        throw new CountryNotFoundException();
    }

    public ArrayList<Country> getAllCountries() {
        return context.getBean("countryList", ArrayList.class);
    }

    public void addCountry(Country country) {
        ArrayList<Country> countries = context.getBean("countryList", ArrayList.class);
        countries.add(country);
    }
}
