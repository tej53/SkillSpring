package DesignPrinciples.DependencyInjection;

public class CustomerService {

    private CustomerRepository customerRepository;

    // Constructor Injection
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void getCustomer(int id) {
        System.out.println(customerRepository.findCustomerById(id));
    }

}
