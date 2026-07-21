package com.cognizant.springlearn.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HelloController - REST controller for Hello World endpoint.
 * Demonstrates basic RESTful Web Service using GET method.
 */
@RestController
public class HelloController {

    private static final Logger LOGGER = LoggerFactory.getLogger(HelloController.class);

    /**
     * GET /hello - Returns "Hello World!!" as plain text.
     *
     * @return String "Hello World!!"
     */
    @GetMapping("/hello")
    public String sayHello() {
        LOGGER.info("START");
        String response = "Hello World!!";
        LOGGER.debug("Response: {}", response);
        LOGGER.info("END");
        return response;
    }
}
