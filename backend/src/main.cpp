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

    Book book(1, "War and Piece", authors[0], novel, "Lorem");

    Storage::AddBook(book);

    User user1("1234", "1234");
    Admin admin("1234", "1234");


    crow::SimpleApp app;

    /*
    crow::mustache::set_base("static/");
    CROW_ROUTE(app, "/")([](){
        crow::mustache::context ctx;
        return crow::mustache::load("index.html").render(ctx);
    });

    CROW_ROUTE(app, "/bookmark")([](){
        crow::mustache::context ctx;
        return crow::mustache::load("bookmark.html").render(ctx);
    });
    */


    CROW_ROUTE(app, "/home").methods("GET"_method)([](){
        crow::json::wvalue result;
        result = Storage::GetBooksAsJson();
        return crow::response{result};
    });
    
    CROW_ROUTE(app, "/home/book/<int>").methods("GET"_method)([](int id){
        crow::json::wvalue result;
        result = Storage::GetBookByID(id).ToJsonWithText();
        return crow::response{result};
    });

    
    CROW_ROUTE(app, "/bookmark").methods("GET"_method)([&user1](){
        crow::json::wvalue result;
        result["Books"] = user1.GetBooksAsJson();
        auto book = user1.RecomendBook();

        if (book.has_value()) {
        // Книга есть - преобразуем в JSON
        result["Recommendation"] = book.value().ToJson();
        } else {
            // Нет рекомендации - возвращаем null или пустой объект
            result["Recommendation"] = nullptr;
        }
        return crow::response{result};
    });
    
    CROW_ROUTE(app, "/home/book/<int>/detail").methods("GET"_method)([](int id){
        crow::json::wvalue result;
        result = Storage::GetBookByID(id).ToJsonWithText();
        return crow::response{result};
    });

    CROW_ROUTE(app, "/bookmark/add").methods("POST"_method)  ([&user1](const crow::request& req)
    {
        auto json = crow::json::load(req.body);
        if (!json) {
            // Невалидный JSON
            crow::json::wvalue error;
            error["error"] = "Invalid JSON";
            return crow::response{400, error};
        }
        int id = json["bookID"].i();
        user1.AddToBookmark(id);

        crow::json::wvalue response;
        return crow::response{200, response};
    });

    CROW_ROUTE(app, "/bookmark/remove").methods("DELETE"_method)  ([&user1](const crow::request& req)
    {
        auto json = crow::json::load(req.body);
        if (!json) {
            // Невалидный JSON
            crow::json::wvalue error;
            error["error"] = "Invalid JSON";
            return crow::response{400, error};
        }
        int id = json["bookID"].i();
        user1.RemoveFromBookmark(id);
        crow::json::wvalue response;
        return crow::response{200, response};
    });

    CROW_ROUTE(app, "/admin").methods("GET"_method)([](){
        crow::json::wvalue result;
        result = Storage::GetBooksAsJson();
        return crow::response{result};
    });  

    CROW_ROUTE(app, "/admin/remove").methods("DELETE"_method)([&admin](const crow::request& req){
        auto json = crow::json::load(req.body);
        if (!json) {
            // Невалидный JSON
            crow::json::wvalue error;
            error["error"] = "Invalid JSON";
            return crow::response{400, error};
        }
        int id = json["bookID"].i();
        admin.RemoveBook(id);
        crow::json::wvalue response;
        return crow::response{200, response};
    });  
    
    CROW_ROUTE(app, "/admin/add").methods("POST"_method)  ([&admin](const crow::request& req){
        auto json = crow::json::load(req.body);
        
        if (!json) {
            // Невалидный JSON
            crow::json::wvalue error;
            error["error"] = "Invalid JSON";
            return crow::response{400, error};
        }
        
        // Извлекаем данные из JSON
        std::string title = json["title"].s();
        std::string genre = json["genre"].s();
        std::string text = json["text"].s();
        
        auto authorJson = json["author"];
        std::string firstName = authorJson["first_name"].s();
        std::string lastName = authorJson["last_name"].s();
        std::string middleName = authorJson["middle_name"].s();
        
        // Создаем автора с полным именем
        Author author(firstName, lastName, middleName);
        // Создаем новую книгу
        int newId = Storage::GenerateBookID();
        Book newBook(newId, title, Author(author), Genre(genre), text);
        admin.AddBook(newBook);
        crow::json::wvalue response;
        return crow::response{200, response};
    }); 
    
    
    


    
    app.port(8080).run();
    

}