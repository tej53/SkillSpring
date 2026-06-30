package EmployeeManagementSystem;

class Employee {
    int employeeID;
    String name;
    String position;
    double salary;

    public Employee(int employeeID, String name, String position, double salary){
        this.employeeID = employeeID;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }

    public void display(){
        System.out.println(
            "Employee Id : " + employeeID + "\n" +
            "Employee Name : " + name + "\n" +
            "Position : " + position + "\n" +
            "Salary : " + salary + "\n"
        );
    }
}
