package com.cognizant.springlearn.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.security.JwtAuthorizationFilter;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * AuthenticationController - REST controller for JWT authentication endpoint.
 * Accepts HTTP Basic Authentication header, decodes credentials, generates and returns a signed JWT.
 */
@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    /**
     * GET /authenticate - Authenticates user and returns JWT token.
     *
     * @param authHeader HTTP Basic Authorization header ("Basic <base64>")
     * @return Map containing key "token" and value as the generated JWT string
     */
    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("START");
        LOGGER.debug("Authorization Header: {}", authHeader);

        String user = getUser(authHeader);
        LOGGER.debug("Authenticated User: {}", user);

        String token = generateJwt(user);
        LOGGER.debug("Generated Token: {}", token);

        Map<String, String> map = new HashMap<>();
        map.put("token", token);

        LOGGER.info("END");
        return map;
    }

    /**
     * Decodes username from Basic Authorization header.
     *
     * @param authHeader Authorization header string starting with "Basic "
     * @return Extracted username string
     */
    private String getUser(String authHeader) {
        LOGGER.info("START - getUser");
        String encodedCredentials = authHeader.substring(6);
        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);
        String decodedString = new String(decodedBytes, StandardCharsets.UTF_8);
        LOGGER.debug("Decoded credentials: {}", decodedString);

        String user = decodedString.split(":")[0];
        LOGGER.debug("Extracted User: {}", user);
        LOGGER.info("END - getUser");
        return user;
    }

    /**
     * Generates a signed JWT token valid for 20 minutes (1200000 ms).
     *
     * @param user Subject username for the token
     * @return Compact signed JWT string
     */
    private String generateJwt(String user) {
        LOGGER.info("START - generateJwt");
        var key = Keys.hmacShaKeyFor(JwtAuthorizationFilter.SECRET_KEY.getBytes(StandardCharsets.UTF_8));

        JwtBuilder builder = Jwts.builder();
        builder.setSubject(user);

        // Set the token issue time as current time
        builder.setIssuedAt(new Date());

        // Set the token expiry as 20 minutes (1200000 ms) from now
        builder.setExpiration(new Date((new Date()).getTime() + 1200000));
        builder.signWith(key, SignatureAlgorithm.HS256);

        String token = builder.compact();
        LOGGER.info("END - generateJwt");
        return token;
    }
}
