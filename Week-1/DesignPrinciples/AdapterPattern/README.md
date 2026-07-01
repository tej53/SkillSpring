# Adapter Pattern Example

# Description

This is a Java-based implementation of the **Adapter Design Pattern** that demonstrates how to integrate multiple third-party payment gateways with different interfaces using a common interface.

It allows users to:

* Process payments using PayPal
* Process payments using Stripe
* Access different payment gateways through a common `PaymentProcessor` interface
* Integrate new payment gateways without modifying existing client code

Design Pattern Used:

* Adapter Pattern

Advantages:

* Allows incompatible interfaces to work together
* Promotes code reusability
* Reduces coupling between client code and third-party services
* Makes the system easy to extend with new payment gateways
* Follows the Open/Closed Principle

Limitations:

* Increases the number of classes due to adapter implementations
* Can make the codebase slightly more complex
* Each new gateway requires a separate adapter class

Best Use Case:

The Adapter Pattern is suitable for applications that need to integrate existing or third-party classes with incompatible interfaces into a unified system without modifying their source code.
