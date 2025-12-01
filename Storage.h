#include "Book.h"
#include "Author.h"
#include "Genre.h"
#include <string>
#include <vector>

class Storage {
    private: 
        static std::vector<Book> Books;
        int ID_count;
    public:
        static void RemoveBook(int ID) {

        }
        static void AddBook(Book Book) {

        }
        static Book GetBookByID(int ID) {

        }
};