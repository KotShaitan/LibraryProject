#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>

Book::Book(int bookID, std::string title, Author author, Genre genre, std::string text) : bookID(bookID), title(title), author(author), genre(genre), text(text) {}

int Book::GetBookID() {
    return bookID;
}

Genre Book::GetGenre() {
    return genre;
}

crow::json::wvalue Book::ToJsonWithText() {
    crow::json::wvalue result;
    result["bookID"] = bookID;
    result["title"] = title;
    result["author"] = author.ToJson();  // Вложенный объект author
    result["genre"] = genre.ToJson();  
    result["fullText"] = text;  // Вложенный объект genre
    return result;
}

crow::json::wvalue Book::ToJson() {
    crow::json::wvalue result;
    result["bookID"] = bookID;
    result["title"] = title;
    result["author"] = author.ToJson();  // Вложенный объект author
    result["genre"] = genre.ToJson();  
    // Вложенный объект genre
    return result;
}