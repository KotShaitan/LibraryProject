#pragma once

#include "Book.h"
#include <string>
#include <vector>

class Bookmark {
    private:
        std::vector<Book> Books;
    public:
        Bookmark();
        void AddToBookmark(int ID);
        void RemoveFromBookmark(int ID);
        Book RecomendBook();
        
};