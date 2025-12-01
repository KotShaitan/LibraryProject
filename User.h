#include "Bookmark.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>
#include <vector>

class User {
    private:
        std::string Login;
        std::string Password;
        Bookmark bookmark;
    public:
        User::User(std::string login, std::string password, Bookmark bookmark){}

        void AddToBookmark(int ID) {
        }

        void RemoveFromBookmark(int ID) {}

};