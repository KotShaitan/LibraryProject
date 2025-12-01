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

    Book::Book(int bookID, std::string title, Author author, Genre genre);
};

