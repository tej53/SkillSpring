# Strategy Pattern Example

# Description

This is a Java-based implementation of the **Strategy Design Pattern** that demonstrates how different payment methods can be selected and changed at runtime without modifying the client code.

It allows users to:

* Make payments using a Credit Card
* Make payments using PayPal
* Switch between payment methods at runtime
* Execute payment operations through a common strategy interface

Design Pattern Used:

* Strategy Pattern

Advantages:

* Enables runtime selection of algorithms
* Promotes loose coupling between the context and strategies
* Makes it easy to add new payment methods
* Eliminates the need for multiple conditional statements
* Follows the Open/Closed Principle

Limitations:

* Increases the number of classes in the project
* The client must be aware of the available strategies
* May add unnecessary complexity for simple applications

Best Use Case:

The Strategy Pattern is suitable for applications where multiple algorithms or behaviors can be used interchangeably at runtime, such as payment processing systems, sorting algorithms, compression techniques, routing systems, and authentication mechanisms.
