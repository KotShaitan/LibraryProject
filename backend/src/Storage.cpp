#include "Storage.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>
#include <vector>
#include <stdexcept>
#include <algorithm>

std::vector<Book> Storage::Books;
int Storage::id_count = 0;

Book Storage::GetBookByID(int ID) {
    for (auto book : Books) {
        if (book.GetBookID() == ID) {
            return book;
        }
    }
    throw std::out_of_range("Book not found");

}

std::vector<Book> Storage::GetListOfBooks() {
    return Books;
}

void Storage::AddBook(Book book) {
        Books.push_back(book);
        id_count++;
}

void Storage::RemoveBook(int ID) {
    auto it = std::find_if(Books.begin(), Books.end(),
        [ID](Book& book) {
            return book.GetBookID() == ID;
        });
        
    if (it != Books.end()) {
            Books.erase(it);
    }
}

crow::json::wvalue Storage::GetBooksAsJson() {
    crow::json::wvalue result;
    
    for (size_t i = 0; i < Books.size(); ++i) {
        result[i] = Books[i].ToJson();
    }
    
    return result;
}

int Storage::GenerateBookID() {
    return ++id_count;
}