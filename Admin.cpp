#include "User.h"
#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include "Storage.h"
#include "Admin.h"
#include <string>
#include <vector>

void Admin::AddBook(Book book) {
    Storage::AddBook(book);
}
void Admin::RemoveBook(int ID) {
    Storage::RemoveBook(ID);
}
