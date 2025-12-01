#include "User.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include "Storage.h"
#include <string>
#include <vector>

class Admin : User {
    public:
        Admin(std::string login, std::string password);

        void AddBook(Book book) {}

        void RemoveBook(int ID) {}
};