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
        std::optional<Book> RecommendBook(); 
        Book RecommendBookAlg();
        crow::json::wvalue GetBooksAsJson();
        
        
};