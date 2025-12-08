#include "Genre.h"
#include <string>

Genre::Genre(std::string name) : name(name) {}

std::string Genre::GetName() {
    return name;
}

crow::json::wvalue Genre::ToJson() {
    crow::json::wvalue result;
    result["name"] = name;
    return result;
}