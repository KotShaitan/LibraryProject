//  g++ -std=c++17 -I./include -I"./include/asio/include" -o app.exe src/main.cpp src/Admin.cpp src/Author.cpp src/Book.cpp src/Bookmark.cpp src/Genre.cpp src/Storage.cpp src/User.cpp -lws2_32 -lwsock32 -lmswsock -DASIO_STANDALONE -D_WIN32_WINNT=0x0601          
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

    Book book(1, "War and Piece", authors[0], novel);

    Storage::AddBook(book);

    User user1("1234", "1234");
    Admin admin("1234", "1234");
    crow::SimpleApp app;


    CROW_ROUTE(app, "/home").methods("GET"_method)([](){
        crow::json::wvalue result;
        result = Storage::GetBooksAsJson();
        return crow::response{result};
    });
    
    CROW_ROUTE(app, "/home/book/<int>").methods("GET"_method)([](int id){
        crow::json::wvalue result;
        result = Storage::GetBookByID(id).ToJson();
        return crow::response{result};
    });

    CROW_ROUTE(app, "/bookmark").methods("GET"_method)([&user1](){
        crow::json::wvalue result;
        result = user1.GetBooksAsJson();
        return crow::response{result};
    });
    
    CROW_ROUTE(app, "/bookmark").methods("GET"_method)([&user1](){
        crow::json::wvalue result;
        auto book = user1.RecomendBook();
        result = book->ToJson();
        return crow::response{result};
    });

    
    app.port(8080).run();
    

}