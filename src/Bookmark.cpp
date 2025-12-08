#include "Bookmark.h"
#include "Book.h"
#include "Author.h"
#include "Storage.h"
#include "Genre.h"
#include <string>
#include <vector>
#include <algorithm>

Bookmark::Bookmark(){};

void Bookmark::AddToBookmark(int ID) {
    Books.push_back(Storage::GetBookByID(ID));
}

void Bookmark::RemoveFromBookmark(int ID) {
    auto it = std::find_if(Books.begin(), Books.end(),
        [ID](Book& book) {
            return book.GetBookID() == ID;
        });
        
    if (it != Books.end()) {
            Books.erase(it);
    }
}

std::optional<Book> Bookmark::RecomendBook() {
    if (Books.empty()) {
        return std::nullopt;
    }
    return RecomendBookAlg();
}

Book Bookmark::RecomendBookAlg() {
    if (Books.size() == 1) {
        for (auto i : Storage::GetListOfBooks()) {
            if (i.GetGenre().GetName() == Books[0].GetGenre().GetName()) {
                return i;
            }
        }
    }
    
    std::unordered_map<std::string, int> genreFrequency;
    
    for (auto book : Books) {
        std::string genreName = book.GetGenre().GetName();
        genreFrequency[genreName]++;
    }
    
    std::string mostFrequentGenre;
    int maxFrequency = 0;
    
    for (const auto& [genreName, frequency] : genreFrequency) {
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            mostFrequentGenre = genreName;
        }
    }
    
    
    
    
    for (auto& book : Storage::GetListOfBooks()) {
        if (book.GetGenre().GetName() == mostFrequentGenre) {
            return book;
        }
    }
    
    
    if (!Storage::GetListOfBooks().empty()) {
        return Storage::GetListOfBooks()[0];
    }
    
    return Storage::GetBookByID(1);
}

crow::json::wvalue Bookmark::GetBooksAsJson() {
    crow::json::wvalue result;
    
    for (size_t i = 0; i < Books.size(); ++i) {
        result[i] = Books[i].ToJson();
    }
    
    return result;
}