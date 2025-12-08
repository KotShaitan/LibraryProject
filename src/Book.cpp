#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>

Book::Book(int bookID, std::string title, Author author, Genre genre) : bookID(bookID), title(title), author(author), genre(genre) {}

int Book::GetBookID() {
    return bookID;
}

Genre Book::GetGenre() {
    return genre;
}

crow::json::wvalue Book::ToJson() {
    crow::json::wvalue result;
    result["bookname"] = title;
    result["author"] = author.ToJson();  // Вложенный объект author
    result["genre"] = genre.ToJson();    // Вложенный объект genre
    return result;
}