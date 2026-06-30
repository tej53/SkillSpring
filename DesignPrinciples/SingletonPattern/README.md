# Singleton Pattern Example

# Description

This is a Java-based implementation of the **Singleton Design Pattern** that ensures only one instance of the Logger class is created and shared throughout the application.

It allows users to:

* Create a single Logger instance
* Access the Logger globally
* Log messages consistently across the application
* Prevent multiple Logger objects from being created

Design Pattern Used:

* Singleton Pattern

Time Complexities:

* getInstance() : O(1)
* log() : O(1)

Advantages:

* Ensures only one instance of a class exists
* Saves memory by avoiding multiple object creation
* Provides a global access point to the instance
* Maintains consistent behavior across the application

Limitations:

* Basic implementation is not thread-safe
* Can make unit testing more difficult
* May introduce tight coupling if overused

Best Use Case:
The Singleton Pattern is suitable for applications that require exactly one shared instance of a class, such as logging systems, configuration managers, database connection managers, cache managers, and printer spoolers.
