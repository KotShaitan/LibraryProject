#pragma once
#include <User.h>
#include <string>
#include <vector>

class Admin : public User {
    public:
        Admin(std::string login, std::string password);

        void AddBook(Book book);

        void RemoveBook(int ID);
};