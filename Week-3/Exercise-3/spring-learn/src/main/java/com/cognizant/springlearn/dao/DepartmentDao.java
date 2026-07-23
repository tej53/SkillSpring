package com.cognizant.springlearn.dao;

import com.cognizant.springlearn.model.Department;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class DepartmentDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentDao.class);
    private static ArrayList<Department> DEPARTMENT_LIST;

    public DepartmentDao() {
        LOGGER.info("START DepartmentDao constructor");
        ApplicationContext context = new ClassPathXmlApplicationContext("employee.xml");
        DEPARTMENT_LIST = (ArrayList<Department>) context.getBean("departmentList");
        LOGGER.debug("Loaded {} departments", DEPARTMENT_LIST.size());
        LOGGER.info("END DepartmentDao constructor");
    }

    public ArrayList<Department> getAllDepartments() {
        LOGGER.info("START getAllDepartments");
        LOGGER.debug("Returning department list of size: {}", DEPARTMENT_LIST.size());
        LOGGER.info("END getAllDepartments");
        return DEPARTMENT_LIST;
    }
}
