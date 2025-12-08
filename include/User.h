#pragma once

#include "Bookmark.h"
#include <string>
#include <vector>

class User {
    protected:
        std::string Login;
        std::string Password;
    private:
        Bookmark bookmark;
    public:
        User(std::string login, std::string password);

        void AddToBookmark(int ID);

        void RemoveFromBookmark(int ID);

        void RecomendBook();
        crow::json::wvalue GetBooksAsJson();
};