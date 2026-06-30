public class Main {

    public static void main(String[] args) {

        TaskManagement list = new TaskManagement();

        list.addTask(101,"Design UI","Pending");
        list.addTask(102,"Develop Backend","In Progress");
        list.addTask(103,"Testing","Pending");

        System.out.println("All Tasks");

        list.displayTasks();

        System.out.println();

        list.searchTask(102);

        System.out.println();

        list.deleteTask(102);

        System.out.println();

        list.displayTasks();
    }
}