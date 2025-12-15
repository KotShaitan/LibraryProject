#include "Bookmark.h"
#include "Book.h"
#include "Author.h"
#include "Storage.h"
#include "Genre.h"
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_set>

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

std::optional<Book> Bookmark::RecommendBook() {
    if (Books.empty()) {
        return std::nullopt;
    }
    return RecommendBookAlg();
}

Book Bookmark::RecommendBookAlg() {
    // Получаем все доступные книги
    auto allBooks = Storage::GetListOfBooks();
    
    // Собираем ID книг, которые уже в закладках (не рекомендуем их)
    std::unordered_set<int> bookmarkedIds;
    for (auto book : Books) {
        bookmarkedIds.insert(book.GetBookID());
    }
    
    // Собираем статистику по жанрам из закладок
    std::unordered_map<std::string, int> genreFrequency;
    
    for (auto book : Books) {
        std::string genreName = book.GetGenre().GetName();
        genreFrequency[genreName]++;
    }
    
    // Находим самый популярный жанр
    std::string mostFrequentGenre;
    int maxFrequency = 0;
    
    for (const auto& [genreName, frequency] : genreFrequency) {
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            mostFrequentGenre = genreName;
        }
    }
    
    // Если нашли самый популярный жанр
    if (!mostFrequentGenre.empty()) {
        // Ищем книгу в этом жанре, которой нет в закладках
        for (auto book : allBooks) {
            if (book.GetGenre().GetName() == mostFrequentGenre && 
                bookmarkedIds.find(book.GetBookID()) == bookmarkedIds.end()) {
                return book;
            }
        }
    }
    
    // Если не нашли в предпочитаемом жанре, ищем любую книгу не из закладок
    for (auto book : allBooks) {
        if (bookmarkedIds.find(book.GetBookID()) == bookmarkedIds.end()) {
            return book;
        }
    }
    
    // Если все книги уже в закладках, возвращаем первую из всех
    if (!allBooks.empty()) {
        return allBooks[0];
    }
    
    // Фолбэк
    return Storage::GetBookByID(1);
}
crow::json::wvalue Bookmark::GetBooksAsJson() {
    crow::json::wvalue result;
    
    for (size_t i = 0; i < Books.size(); ++i) {
        result[i] = Books[i].ToJson();
    }
    
    return result;
}