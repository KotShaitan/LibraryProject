#pragma once
#include "crow.h"
#include "Book.h"
#include <string>
#include <vector>

class Storage {
    private: 
        static int id_count;
        static std::vector<Book> Books;
    public:
        static std::vector<Book> GetListOfBooks();
        static void RemoveBook(int ID);
        static void AddBook(Book Book);
        static Book GetBookByID(int ID);
        static crow::json::wvalue GetBooksAsJson();
        static int GenerateBookID();
};