#include "Bookmark.h"
#include "Book.h"
#include "Author.h"
#include "Storage.h"
#include "Genre.h"
#include <string>
#include <vector>
#include <algorithm>

Bookmark::Bookmark(){};

void Bookmark::AddToBookmark(int ID) {
    Books.push_back(Storage::GetBookByID(ID));
}

void Bookmark::RemoveFromBookmark(int ID) {
    auto it = std::find_if(Books.begin(), Books.end(),
        [ID](Book& book) {
            return book.GetBookID() == ID;
        });
        
    if (it != Books.end()) {
            Books.erase(it);
    }
}

Book Bookmark::RecomendBook() {
    return Books[0];
}