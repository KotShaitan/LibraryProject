
#define CROW_MAIN
#include "crow.h"
#include "Admin.h"
#include "Author.h"
#include "Book.h"
#include "Bookmark.h"
#include "Genre.h"
#include "Storage.h"
#include "User.h"

#include <string>
#include <vector>

int main() {
    std::vector<Genre> genres;
    Genre novel("Novel");
    Genre ballad("Ballad");
    genres.push_back(novel);
    genres.push_back(ballad);

    std::vector<Author> authors;
    Author author1("Lev", "Tolstiy", "");
    authors.push_back(author1);

    Storage storage;
    Book book(1, "War and Piece", authors[0], novel);

    storage.AddBook(book);

    User user1("1234", "1234");
    Admin admin("1234", "1234");
    
}