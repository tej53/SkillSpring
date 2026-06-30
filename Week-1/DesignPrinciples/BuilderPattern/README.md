# Builder Pattern Example

# Description

This is a Java-based implementation of the **Builder Design Pattern** that demonstrates how to construct complex objects step by step using a Builder class. It separates the object construction process from its representation, making it easier to create different configurations of the same object.

It allows users to:

* Create Computer objects with required attributes
* Add optional components such as Graphics Card, Operating System, and WiFi
* Build different Computer configurations using the Builder class
* Create immutable objects through a controlled construction process

Design Pattern Used:

* Builder Pattern

Time Complexities:

* Builder() : O(1)
* setGraphicsCard() : O(1)
* setOperatingSystem() : O(1)
* setWifi() : O(1)
* build() : O(1)
* displayDetails() : O(1)

Advantages:

* Simplifies the creation of complex objects
* Supports method chaining for better readability
* Separates object construction from object representation
* Avoids constructors with many parameters
* Makes the code easy to maintain and extend

Limitations:

* Requires creating an additional Builder class
* Slightly increases the amount of code
* May be unnecessary for simple objects with few attributes

Best Use Case:

The Builder Pattern is suitable for applications where objects have many optional parameters or require multiple construction steps. It is commonly used for creating complex objects while keeping the client code clean, readable, and maintainable.