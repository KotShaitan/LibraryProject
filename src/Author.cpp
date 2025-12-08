#include "Author.h"

Author::Author(std::string name, 
               std::string last_name, 
               std::string patronymic)
    : name(name), last_name(last_name), patronymic(patronymic) {}

    crow::json::wvalue Author::ToJson() {
    crow::json::wvalue result;
    result["name"] = name;
    result["last_name"] = last_name;
    result["patronymic"] = patronymic;
    return result;
}