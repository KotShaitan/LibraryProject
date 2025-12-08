#pragma once
#include "crow.h"
#include <string>
class Genre
{
    private:
        std::string name;
    public:
        Genre(std::string name);
        crow::json::wvalue ToJson();
        std::string GetName();
};

