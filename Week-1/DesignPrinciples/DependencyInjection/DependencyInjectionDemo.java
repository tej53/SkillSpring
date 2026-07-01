package DesignPrinciples.DependencyInjection;

public class DependencyInjectionDemo {

    public static void main(String[] args) {

        CustomerRepository repository = new CustomerRepositoryImpl();

        CustomerService service = new CustomerService(repository);

        service.getCustomer(101);

    }

}
