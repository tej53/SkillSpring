package com.cognizant.springlearn;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
class SpringLearnApplicationTests {

    @Autowired
    private MockMvc mvc;

    @Test
    void testGetAllCountries() throws Exception {
        ResultActions actions = mvc.perform(get("/countries"));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$").exists());
        actions.andExpect(jsonPath("$[0].code").exists());
    }

    @Test
    void testGetCountryByCode() throws Exception {
        ResultActions actions = mvc.perform(get("/countries/in"));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$.code").value("IN"));
    }

    @Test
    void testGetCountryException() throws Exception {
        ResultActions actions = mvc.perform(get("/countries/az"));
        actions.andExpect(status().isNotFound());
        actions.andExpect(status().reason("Country not found"));
    }

    @Test
    void testAddCountry() throws Exception {
        String newCountry = "{\"code\":\"FR\",\"name\":\"France\"}";
        ResultActions actions = mvc.perform(post("/countries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newCountry));
        actions.andExpect(status().isOk());
    }

    @Test
    void testAddCountryValidationError() throws Exception {
        String invalidCountry = "{\"code\":\"F\",\"name\":\"France\"}";
        ResultActions actions = mvc.perform(post("/countries")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidCountry));
        actions.andExpect(status().isBadRequest());
    }
    
    @Test
    void testGetAllEmployees() throws Exception {
        ResultActions actions = mvc.perform(get("/employees"));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$").exists());
    }

    @Test
    void testGetAllDepartments() throws Exception {
        ResultActions actions = mvc.perform(get("/departments"));
        actions.andExpect(status().isOk());
        actions.andExpect(jsonPath("$").exists());
    }

    @Test
    void testUpdateEmployee() throws Exception {
        String updatedEmployee = "{\n" +
                "  \"id\": 1,\n" +
                "  \"name\": \"John Smith Updated\",\n" +
                "  \"salary\": 85000.0,\n" +
                "  \"permanent\": true,\n" +
                "  \"dateOfBirth\": \"15/06/1990\",\n" +
                "  \"department\": {\n" +
                "    \"id\": 1,\n" +
                "    \"name\": \"IT\"\n" +
                "  },\n" +
                "  \"skills\": [\n" +
                "    {\n" +
                "      \"id\": 1,\n" +
                "      \"name\": \"Java\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";
        
        ResultActions actions = mvc.perform(put("/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedEmployee));
        actions.andExpect(status().isOk());
    }

    @Test
    void testUpdateEmployeeNotFound() throws Exception {
        String nonExistentEmployee = "{\n" +
                "  \"id\": 999,\n" +
                "  \"name\": \"Ghost Employee\",\n" +
                "  \"salary\": 50000.0,\n" +
                "  \"permanent\": false,\n" +
                "  \"dateOfBirth\": \"01/01/2000\",\n" +
                "  \"department\": {\n" +
                "    \"id\": 1,\n" +
                "    \"name\": \"IT\"\n" +
                "  },\n" +
                "  \"skills\": []\n" +
                "}";
                
        ResultActions actions = mvc.perform(put("/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content(nonExistentEmployee));
        actions.andExpect(status().isNotFound());
    }

    @Test
    void testDeleteEmployee() throws Exception {
        ResultActions actions = mvc.perform(delete("/employees/2"));
        actions.andExpect(status().isOk());
    }

    @Test
    void testDeleteEmployeeNotFound() throws Exception {
        ResultActions actions = mvc.perform(delete("/employees/999"));
        actions.andExpect(status().isNotFound());
    }
}
