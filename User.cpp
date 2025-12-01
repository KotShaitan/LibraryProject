#include "User.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include "Bookmark.h"
#include <string>
#include <vector>

User::User(std::string login, std::string password, Bookmark bookmark) : Login(login), Password(password), bookmark(bookmark) {}

void User::AddToBookmark(int ID) {
    bookmark.AddToBookmark(ID);
}
    
void User::RemoveFromBookmark(int ID) {
    bookmark.RemoveFromBookmark(ID); 
}