# Factory Method Pattern Example

# Description

This is a Java-based implementation of the **Factory Method Design Pattern** that demonstrates how to create different types of documents without exposing the object creation logic to the client.

It allows users to:

* Create Word Documents
* Create PDF Documents
* Create Excel Documents
* Use Factory Classes to instantiate document objects

Design Pattern Used:

* Factory Method Pattern

Time Complexities:

* createDocument() : O(1)
* open() : O(1)

Advantages:

* Promotes loose coupling between the client and concrete classes
* Follows the Open/Closed Principle
* Simplifies object creation
* Makes the code easy to extend with new document types

Limitations:

* Requires creating additional factory classes
* Increases the number of classes in the project
* May be unnecessary for very small applications

Best Use Case:
The Factory Method Pattern is suitable for applications where object creation logic needs to be centralized, hidden from the client, and easily extensible for adding new object types without modifying existing code.
