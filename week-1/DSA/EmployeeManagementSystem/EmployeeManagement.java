package EmployeeManagementSystem;

class EmployeeManagement {
    Employee employees[] = new Employee[100];
    int count = 0;
    
    public void addEmployee(Employee emp){
        if(count<employees.length){
            employees[count] = emp;
            count++;
            System.out.println("Employee added successfully");
        }else{
            System.out.println("Employee Array is full");
        }
    }

    public Employee searchEmployee(int id){
        for(int i=0;i<count;i++){
            if(employees[i].employeeID == id){
                return employees[i];
            }
        }

        return null;
    }

    public void traverseEmployees(){
        for(int i=0;i<count;i++){
            employees[i].display();
        }
    }

    public void deleteEmployee(int id){
        int index = -1;

        for(int i=0;i<count;i++){
            if(employees[i].employeeID == id){
                index = i;
                break;
            }
        }

        if(index==-1){
            System.out.println("Employee Not found");
            return;
        }

        for(int i=index;i<count-1;i++){
            employees[i] = employees[i+1];
        }

        employees[count -1] = null;
        count--;

        System.out.println("Employee deleted successfully");
    }
}
