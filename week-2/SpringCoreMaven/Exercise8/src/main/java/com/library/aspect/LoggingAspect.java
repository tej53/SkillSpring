package com.library.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.After;

@Aspect
public class LoggingAspect {

    // Advice executing before service/repository methods
    @Before("execution(* com.library.service.*.*(..)) || execution(* com.library.repository.*.*(..))")
    public void logBefore() {
        System.out.println("[LoggingAspect] BEFORE method execution: Logging method invocation.");
    }

    // Advice executing after service/repository methods
    @After("execution(* com.library.service.*.*(..)) || execution(* com.library.repository.*.*(..))")
    public void logAfter() {
        System.out.println("[LoggingAspect] AFTER method execution: Finished executing method.");
    }
}
