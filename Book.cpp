#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>

Book::Book(int bookID, std::string title, Author author, Genre genre) : bookID(bookID), title(title), author(author), genre(genre) {}