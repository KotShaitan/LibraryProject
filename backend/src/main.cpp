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

#include <sstream>
#include <fstream>
#include <string>
#include <vector>

std::string loadFile(const std::string& path) {
    // Пробуем несколько возможных путей
    std::vector<std::string> possiblePaths = {
        path,
        "../" + path,
        "../../" + path,
        "C:/Users/kot_shaitan/Desktop/Library_CC/" + path,
        "C:/Users/kot_shaitan/Desktop/Library_CC/backend/" + path
    };
    
    for (const auto& p : possiblePaths) {
        std::ifstream file(p, std::ios::binary);
        if (file.is_open()) {
            std::cout << "Файл найден: " << p << std::endl;
            std::stringstream buffer;
            buffer << file.rdbuf();
            return buffer.str();
        }
    }
    
    std::cerr << "Файл не найден: " << path << std::endl;
    std::cerr << "Пробовали пути:" << std::endl;
    for (const auto& p : possiblePaths) {
        std::cerr << "  " << p << std::endl;
    }
    return "";
}
int main() {
    std::vector<Genre> genres;
    Genre novel("Novel");
    Genre ballad("Ballad");
    genres.push_back(novel);
    genres.push_back(ballad);

    std::vector<Author> authors;
    Author author1("Lev", "Tolstiy", "");
    Author author2("Lev", "Tolst", "");
    authors.push_back(author1);
    authors.push_back(author2);

    Book book(1, "War and Piece", authors[0], novel, "Lorem");
    Book book2(2, "War", authors[1], ballad, "Lorem1");
    Book book3(3, "Anna Karenina", authors[0], novel, "Tragic love story in 19th century Russia");
    Book book4(4, "The Death of Ivan Ilyich", authors[0], novel, "Novella about mortality and meaning of life");
    Book book5(5, "Resurrection", authors[0], novel, "Social critique and spiritual awakening");
    Book book6(6, "Hadji Murat", authors[0], novel, "Historical novella about Caucasian resistance");
    Book book7(7, "Childhood", authors[0], novel, "First part of autobiographical trilogy");
    Book book8(8, "Sevastopol Sketches", authors[0], genres[0], "War stories based on Crimean War");
    Book book9(9, "The Kreutzer Sonata", authors[0], novel, "Novella about jealousy and marriage");

    // Если нужны книги других жанров и авторов
    Genre drama("Drama");
    Genre poetry("Poetry");
    Genre history("Historical");
    genres.push_back(drama);
    genres.push_back(poetry);
    genres.push_back(history);

    Author author3("Fyodor", "Dostoevsky", "");
    Author author4("Anton", "Chekhov", "");
    Author author5("Alexander", "Pushkin", "");
    authors.push_back(author3);
    authors.push_back(author4);
    authors.push_back(author5);

    Book book10(10, "Crime and Punishment", author3, drama, "Psychological drama about guilt and redemption");
    Book book11(11, "The Brothers Karamazov", author3, novel, "Philosophical novel exploring faith and doubt");
    Book book12(12, "The Seagull", author4, drama, "Play about art, love, and the creative process");
    Book book13(13, "Eugene Onegin", author5, poetry, "Novel in verse about love and society");
    Book book14(14, "The Queen of Spades", author5, novel, "Gothic short story about obsession");

    // Добавляем все книги в хранилище
    Storage::AddBook(book3);
    Storage::AddBook(book4);
    Storage::AddBook(book5);
    Storage::AddBook(book6);
    Storage::AddBook(book7);
    Storage::AddBook(book8);
    Storage::AddBook(book9);
    Storage::AddBook(book10);
    Storage::AddBook(book11);
    Storage::AddBook(book12);
    Storage::AddBook(book13);
    Storage::AddBook(book14);
    Storage::AddBook(book);
    Storage::AddBook(book2);

    User user1("1234", "1234");
    Admin admin("1234", "1234");

    user1.AddToBookmark(1);


    crow::SimpleApp app;

    CROW_ROUTE(app, "/")([](){
        std::string content = loadFile("static/index.html");
        if (content.empty()) {
            content = "<h1>Error: index.html not found</h1>";
        }
        auto resp = crow::response(content);
        resp.set_header("Content-Type", "text/html");
        return resp;
    });

    CROW_ROUTE(app, "/bookmark")([](){
        std::string content = loadFile("static/bookmark.html");
        if (content.empty()) {
            content = "<h1>Error: bookmark.html not found</h1>";
        }
        auto resp = crow::response(content);
        resp.set_header("Content-Type", "text/html");
        return resp;
    });

    CROW_ROUTE(app, "/admin")([](){
        std::string content = loadFile("static/admin.html");
        if (content.empty()) {
            content = "<h1>Error: admin.html not found</h1>";
        }
        auto resp = crow::response(content);
        resp.set_header("Content-Type", "text/html");
        return resp;
    });

    CROW_ROUTE(app, "/api/home").methods("GET"_method)([](){
        crow::json::wvalue result;
        result = Storage::GetBooksAsJson();
        return crow::response{result};
    });
    
    CROW_ROUTE(app, "/api/home/book/<int>").methods("GET"_method)([](int id){
        crow::json::wvalue result;
        result = Storage::GetBookByID(id).ToJsonWithText();
        return crow::response{result};
    });

    
    CROW_ROUTE(app, "/api/bookmark").methods("GET"_method)([&user1](){
        crow::json::wvalue result;
        result = user1.GetBooksAsJson();
        return crow::response{result};
    });

    CROW_ROUTE(app, "/api/recommend").methods("GET"_method)([&user1]() {
        auto book = user1.RecommendBook();
        crow::json::wvalue result;
        if (book.has_value()) {
        // Книга есть - преобразуем в JSON
        result = book.value().ToJson();
        } else {
            // Нет рекомендации - возвращаем null или пустой объект
            result = nullptr;
        }
        return crow::response{result};
    });
    
    CROW_ROUTE(app, "/api/home/book/<int>/detail").methods("GET"_method)([](int id){
        crow::json::wvalue result;
        result = Storage::GetBookByID(id).ToJsonWithText();
        return crow::response{result};
    });

    CROW_ROUTE(app, "/api/bookmark/add").methods("POST"_method)  ([&user1](const crow::request& req)
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

    CROW_ROUTE(app, "/api/bookmark/remove").methods("DELETE"_method)  ([&user1](const crow::request& req)
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

    CROW_ROUTE(app, "/api/admin").methods("GET"_method)([](){
        crow::json::wvalue result;
        result = Storage::GetBooksAsJson();
        return crow::response{result};
    });  

    CROW_ROUTE(app, "/api/admin/remove").methods("DELETE"_method)([&admin](const crow::request& req){
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
    
    CROW_ROUTE(app, "/api/admin/add").methods("POST"_method)  ([&admin](const crow::request& req){
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
        std::string text = json["fullText"].s();
        
        auto authorJson = json["author"];
        std::string firstName = authorJson["name"].s();
        std::string lastName = authorJson["lname"].s();
        std::string middleName = authorJson["patronymic"].s();
        
        // Создаем автора с полным именем
        Author author(firstName, lastName, middleName);
        // Создаем новую книгу
        int newId = Storage::GenerateBookID();
        Book newBook(newId, title, Author(author), Genre(genre), text);
        admin.AddBook(newBook);
        crow::json::wvalue response;
        return crow::response{200, response};
    }); 
    CROW_ROUTE(app, "/static/<string>")([](const std::string& filename){
        std::string content = loadFile("static/" + filename);
        if (content.empty()) {
            return crow::response(404);
        }
        
        std::string content_type = "text/plain";
        if (filename.find(".css") != std::string::npos) {
            content_type = "text/css";
        } else if (filename.find(".js") != std::string::npos) {
            content_type = "application/javascript";
        }
        // ... остальные типы
        
        auto resp = crow::response(content);
        resp.set_header("Content-Type", content_type);
        return resp;
    });



    
    app.port(8080).run();

    

}