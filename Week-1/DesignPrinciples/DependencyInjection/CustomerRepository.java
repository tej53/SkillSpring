package DesignPrinciples.DependencyInjection;

public interface CustomerRepository {
    String findCustomerById(int id);
}
