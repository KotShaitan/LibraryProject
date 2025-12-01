#pragma once

#include <string> 
class Author {
    private:
        std::string name;
        std::string last_name;
        std::string patronymic;
    public:
        Author(std::string name, std::string last_name, std::string patronymic);
    
};