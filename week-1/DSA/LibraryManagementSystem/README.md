# Library Management System

# Description

This Java project implements a simple Library Management System that allows users to search for books based on their title.

It allows users to:
- Store book details
- Display all books in the library
- Search books using Linear Search
- Search books using Binary Search
- Sort books by title before performing Binary Search

Algorithms Used:
- Linear Search
- Binary Search


Time Complexities:

Linear Search:
- Best Case : O(1)
- Average Case : O(n)
- Worst Case : O(n)

Binary Search:
- Best Case : O(1)
- Average Case : O(log n)
- Worst Case : O(log n)


Function Time Complexities:

- addBook() : O(1)
- displayBooks() : O(n)
- linearSearch() : O(n)
- sortBooks() : O(n log n)
- binarySearch() : O(log n)


Best Approach:

Linear Search is suitable for small or unsorted datasets because it does not require sorting.

Binary Search is preferred for large datasets because it significantly reduces search time, but it requires the books to be sorted before searching.