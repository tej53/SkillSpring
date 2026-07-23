package com.cognizant.springlearn;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Base64;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import com.cognizant.springlearn.controller.AuthenticationController;
import com.cognizant.springlearn.controller.CountryController;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class SpringLearnApplicationTests {

    @Autowired
    private CountryController countryController;

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private MockMvc mvc;

    /**
     * Test if Controllers are loaded in the application context.
     */
    @Test
    public void contextLoads() {
        assertNotNull(countryController);
        assertNotNull(authenticationController);
    }

    /**
     * Test GET /authenticate with valid user basic auth - returns JWT token.
     */
    @Test
    public void testAuthenticateUser() throws Exception {
        String authHeader = "Basic " + Base64.getEncoder().encodeToString("user:pwd".getBytes());
        ResultActions actions = mvc.perform(get("/authenticate").header("Authorization", authHeader));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$.token").exists());
    }

    /**
     * Test GET /authenticate with valid admin basic auth - returns JWT token.
     */
    @Test
    public void testAuthenticateAdmin() throws Exception {
        String authHeader = "Basic " + Base64.getEncoder().encodeToString("admin:pwd".getBytes());
        ResultActions actions = mvc.perform(get("/authenticate").header("Authorization", authHeader));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$.token").exists());
    }

    /**
     * Test GET /authenticate with wrong password - returns 401 Unauthorized.
     */
    @Test
    public void testAuthenticateInvalidUser() throws Exception {
        String authHeader = "Basic " + Base64.getEncoder().encodeToString("user:wrongpwd".getBytes());
        ResultActions actions = mvc.perform(get("/authenticate").header("Authorization", authHeader));
        actions.andExpect(status().isUnauthorized());
    }

    /**
     * Test GET /countries without authentication header - returns 401 Unauthorized.
     */
    @Test
    public void testUnauthenticatedAccess() throws Exception {
        ResultActions actions = mvc.perform(get("/countries"));
        actions.andExpect(status().isUnauthorized());
    }

    /**
     * Test GET /countries with valid JWT Bearer token - returns 200 OK with country list.
     */
    @Test
    public void testJwtAuthenticatedAccess() throws Exception {
        // Step 1: Obtain token from /authenticate
        String authHeader = "Basic " + Base64.getEncoder().encodeToString("user:pwd".getBytes());
        MvcResult authResult = mvc.perform(get("/authenticate").header("Authorization", authHeader))
                .andExpect(status().isOk())
                .andReturn();

        String responseString = authResult.getResponse().getContentAsString();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(responseString);
        String token = root.get("token").asText();

        // Step 2: Call /countries using Bearer token
        ResultActions actions = mvc.perform(get("/countries").header("Authorization", "Bearer " + token));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$").isArray());
        actions.andExpect(jsonPath("$[0].code").exists());
    }

    /**
     * Test GET /countries with invalid JWT Bearer token - returns 401 Unauthorized.
     */
    @Test
    public void testJwtInvalidTokenAccess() throws Exception {
        ResultActions actions = mvc.perform(get("/countries").header("Authorization", "Bearer invalidtoken"));
        actions.andExpect(status().isUnauthorized());
    }
}
