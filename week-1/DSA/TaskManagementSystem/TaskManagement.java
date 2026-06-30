class TaskManagement {

    Task head = null;

    // Add Task
    public void addTask(int id, String name, String status) {

        Task newTask = new Task(id, name, status);

        if(head == null){
            head = newTask;
            return;
        }

        Task temp = head;

        while(temp.next != null){
            temp = temp.next;
        }

        temp.next = newTask;
    }

    // Search Task
    public void searchTask(int id){

        Task temp = head;

        while(temp != null){

            if(temp.taskId == id){
                System.out.println("Task Found");
                System.out.println("ID : " + temp.taskId);
                System.out.println("Name : " + temp.taskName);
                System.out.println("Status : " + temp.status);
                return;
            }

            temp = temp.next;
        }

        System.out.println("Task Not Found");
    }

    // Traverse
    public void displayTasks(){

        if(head == null){
            System.out.println("No Tasks Available");
            return;
        }

        Task temp = head;

        while(temp != null){

            System.out.println("------------------------");
            System.out.println("Task ID : " + temp.taskId);
            System.out.println("Task Name : " + temp.taskName);
            System.out.println("Status : " + temp.status);

            temp = temp.next;
        }
    }

    // Delete Task
    public void deleteTask(int id){

        if(head == null){
            System.out.println("List is Empty");
            return;
        }

        if(head.taskId == id){
            head = head.next;
            System.out.println("Task Deleted");
            return;
        }

        Task temp = head;

        while(temp.next != null && temp.next.taskId != id){
            temp = temp.next;
        }

        if(temp.next == null){
            System.out.println("Task Not Found");
        }
        else{
            temp.next = temp.next.next;
            System.out.println("Task Deleted");
        }
    }
}