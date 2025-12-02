#pragma once
#include "Genre.h"
#include "Author.h"
#include <string>
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
};

