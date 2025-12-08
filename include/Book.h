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
        std::string text;
    public:
        Book(int bookID, std::string title, Author author, Genre genre, std::string text);

        int GetBookID();

        Genre GetGenre();
        std::string GetText();
        crow::json::wvalue ToJson();
        crow::json::wvalue ToJsonWithText();
};

