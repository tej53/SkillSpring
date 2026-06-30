# Task Management System

# Description

This is a Java-based Task Management System that manages tasks efficiently using a Singly Linked List.

It allows users to:
- Add Tasks
- Search Tasks
- Display All Tasks
- Delete Tasks

Data Structure Used:
- Singly Linked List

Time Complexities:
- addTask() : O(n)
- searchTask() : O(n)
- displayTasks() : O(n)
- deleteTask() : O(n)

Advantages:
- Dynamic size
- Efficient insertion and deletion without shifting elements
- Memory is allocated as needed

Limitations:
- No direct index-based access
- Searching requires sequential traversal
- Extra memory is needed for storing node references

Best Use Case:
Singly Linked Lists are suitable for applications where records are frequently added or removed, and the size of the data changes dynamically.