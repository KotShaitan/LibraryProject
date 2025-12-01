#include "Storage.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>
#include <vector>
#include <algorithm>

Book Storage::GetBookByID(int ID) {
    for (auto book : Books) {
        if (book.GetBookID() == ID) {
            return book;
        }
    }
}

void Storage::AddBook(Book book) {
        Books.push_back(book);
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
