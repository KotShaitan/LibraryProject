#pragma once
#include "Genre.h"
#include "Author.h"
#include <string>
#include "crow.h"
class Book {
    private: 
        int bookID;
        std::string title;
        Author author;
        Genre genre;
    public:
        Book(int bookID, std::string title, Author author, Genre genre);

        int GetBookID();

        Genre GetGenre();

        crow::json::wvalue ToJson();
        
};

