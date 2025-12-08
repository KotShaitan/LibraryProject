#pragma once

#include "crow.h"
#include <string> 
class Author {
    private:
        std::string name;
        std::string last_name;
        std::string patronymic;
    public:
        Author(std::string name, std::string last_name, std::string patronymic);
        crow::json::wvalue ToJson();
    
};