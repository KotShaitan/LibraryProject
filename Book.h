#pragma once

#include "Author.h"
#include "Genre.h"
#include <string>
class Book {
    private: 
        int bookID;
        std::string title;
        Author author;
        Genre genre;
    public:
        Book::Book(int bookID, std::string title, Author author, Genre genre);

        int GetBookID() {}

        
};

