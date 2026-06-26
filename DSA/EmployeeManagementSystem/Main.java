package DSA.EmployeeManagementSystem;

class Main {
    public static void main(String[] args) {
        EmployeeManagement management = new EmployeeManagement();

        management.addEmployee(new Employee(1001, "Tej", "Java Developer", 100000.0));
        management.addEmployee(new Employee(1002, "Kalyani", "AI Engineer", 50000));
        management.addEmployee(new Employee(1003, "Siddu", "Data Engineer", 30000));
        management.addEmployee(new Employee(1004, "Dev", "Full Stack AI Engineer", 150000));

        System.out.println("All Employees: \n");
        management.traverseEmployees();

        System.out.print("Search Result\n");
        Employee emp = management.searchEmployee(1002);

        if(emp !=null){
            emp.display();
        }else{
            System.out.println("Employee not found\n");
        }

        management.deleteEmployee(1004);
        System.out.println("After Deletion: \n");
        management.traverseEmployees();
    }
}
