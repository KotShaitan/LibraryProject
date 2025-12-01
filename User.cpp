#include "User.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>
#include <vector>

User::User(std::string login, std::string password, Bookmark bookmark) : Login(login), Password(password), bookmark(bookmark) {}

void AddToBookmark(int ID) {}

void RemoveFromBookmark(int ID) {}