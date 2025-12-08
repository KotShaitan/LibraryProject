const API_BASE_URL = 'http://localhost:8080';

let mockBooks = [
    {
        bookID: 1,
        title: "Война и мир",
        author: {
            name: "Лев",
            lname: "Толстой",
            patronymic: "Николаевич"
        },
        genre: {
            name: "Роман"
        }
    },
    {
        bookID: 2,
        title: "Преступление и наказание",
        author: {
            name: "Фёдор",
            lname: "Достоевский",
            patronymic: "Михайлович"
        },
        genre: {
            name: "Роман"
        }
    },
    {
        bookID: 3,
        title: "Мастер и Маргарита",
        author: {
            name: "Михаил",
            lname: "Булгаков",
            patronymic: "Афанасьевич"
        },
        genre: {
            name: "Фэнтези"
        }
    },
    {
        bookID: 4,
        title: "1984",
        author: {
            name: "Джордж",
            lname: "Оруэлл",
            patronymic: ""
        },
        genre: {
            name: "Антиутопия"
        }
    },
    {
        bookID: 5,
        title: "Гарри Поттер и философский камень",
        author: {
            name: "Джоан",
            lname: "Роулинг",
            patronymic: ""
        },
        genre: {
            name: "Фэнтези"
        }
    }
];

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const genreFilter = document.getElementById('genreFilter');
const sortSelect = document.getElementById('sortSelect');
const addBookModal = document.getElementById('addBookModal');
const addBookForm = document.getElementById('addBookForm');
const closeModal = document.querySelector('.close');

document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    populateGenres();
    
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        setupHomePage();
    } else if (window.location.pathname.includes('bookmark.html')) {
        setupBookmarksPage();
    } else if (window.location.pathname.includes('admin.html')) {
        setupAdminPage();
    }
});

function setupHomePage() {

    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('input', filterBooks);

    genreFilter.addEventListener('change', filterBooks);
    sortSelect.addEventListener('change', filterBooks);

    if (addBookForm) {
        addBookForm.addEventListener('submit', handleAddBook);
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            addBookModal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === addBookModal) {
            addBookModal.style.display = 'none';
        }
    });
}

async function loadBooks() {
    try {
        // Здесь будет реальный запрос к API
        // const response = await fetch(`${API_BASE_URL}/home`);
        // const books = await response.json();

        const books = mockBooks;
        renderBooks(books);
    } catch (error) {
        console.error('Ошибка загрузки книг:', error);
        renderBooks(mockBooks);
    }
}

function renderBooks(books) {
    if (!booksContainer) return;
    
    booksContainer.innerHTML = '';
    
    books.forEach(book => {
        const isBookmarked = bookmarks.some(b => b.bookID === book.bookID);
        
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">
                <i class="fas fa-book"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">
                    ${book.author.lname} ${book.author.name} ${book.author.patronymic}
                </p>
                <span class="book-genre">${book.genre.name}</span>
                <div class="book-actions">
                    <button class="btn btn-bookmark ${isBookmarked ? 'added' : ''}" 
                            data-id="${book.bookID}">
                        <i class="fas ${isBookmarked ? 'fa-check' : 'fa-bookmark'}"></i>
                        ${isBookmarked ? 'В закладках' : 'В закладки'}
                    </button>
                    <button class="btn btn-details" onclick="viewBookDetails(${book.bookID})">
                        <i class="fas fa-info-circle"></i> Подробнее
                    </button>
                </div>
            </div>
        `;
        
        booksContainer.appendChild(bookCard);
    });

    document.querySelectorAll('.btn-bookmark').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            toggleBookmark(bookId);
        });
    });
}

async function toggleBookmark(bookId) {
    const book = mockBooks.find(b => b.bookID === bookId);
    const isBookmarked = bookmarks.some(b => b.bookID === bookId);
    
    if (isBookmarked) {
        try {
            // Тут будет реальный запрос: await fetch(`${API_BASE_URL}/bookmark/remove/${bookId}`, { method: 'DELETE' });
            bookmarks = bookmarks.filter(b => b.bookID !== bookId);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            showNotification('Книга удалена из закладок', 'info');
        } catch (error) {
            console.error('Ошибка удаления из закладок:', error);
            showNotification('Ошибка удаления из закладок', 'error');
        }
    } else {
        try {
            // Тут будет реальный запрос: await fetch(`${API_BASE_URL}/bookmark`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ id: bookId })
            // });
            bookmarks.push(book);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            showNotification('Книга добавлена в закладки', 'success');
        } catch (error) {
            console.error('Ошибка добавления в закладки:', error);
            showNotification('Ошибка добавления в закладки', 'error');
        }
    }
    

    if (window.location.pathname.includes('bookmark.html')) {
        renderBookmarks();
    } else {
        loadBooks();
    }
}

function populateGenres() {
    if (!genreFilter) return;
    
    const genres = [...new Set(mockBooks.map(book => book.genre.name))];
    
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

function filterBooks() {
    let filteredBooks = [...mockBooks];

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.lname.toLowerCase().includes(searchTerm) ||
            book.author.name.toLowerCase().includes(searchTerm) ||
            book.genre.name.toLowerCase().includes(searchTerm)
        );
    }

    const selectedGenre = genreFilter.value;
    if (selectedGenre) {
        filteredBooks = filteredBooks.filter(book => book.genre.name === selectedGenre);
    }

    const sortBy = sortSelect.value;
    switch(sortBy) {
        case 'title':
            filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title_desc':
            filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'author':
            filteredBooks.sort((a, b) => a.author.lname.localeCompare(b.author.lname));
            break;
    }
    
    renderBooks(filteredBooks);
}

async function handleAddBook(e) {
    e.preventDefault(); 
    
    const newBook = {
        bookID: mockBooks.length + 1,
        title: document.getElementById('bookTitle').value,
        author: {
            name: document.getElementById('authorName').value,
            lname: document.getElementById('authorLname').value,
            patronymic: document.getElementById('authorPatronymic').value
        },
        genre: {
            name: document.getElementById('bookGenre').value
        }
    };
    
    try {
        // Тут будет реальный запрос: await fetch(`${API_BASE_URL}/home/addbook/${newBook.bookID}`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newBook)
        // });
        
        mockBooks.push(newBook);
        addBookModal.style.display = 'none';
        addBookForm.reset();
        loadBooks();
        populateGenres();
        showNotification('Книга успешно добавлена', 'success');
    } catch (error) {
        console.error('Ошибка добавления книги:', error);
        showNotification('Ошибка добавления книги', 'error');
    }
}

function viewBookDetails(bookId) {
    const book = mockBooks.find(b => b.bookID === bookId);
    if (book) {
        alert(`Детали книги:\n\nНазвание: ${book.title}\nАвтор: ${book.author.lname} ${book.author.name} ${book.author.patronymic}\nЖанр: ${book.genre.name}`);
    }
}

function setupBookmarksPage() {
    renderBookmarks();
}

function renderBookmarks() {
    const container = document.querySelector('.bookmarks-container') || booksContainer;
    if (!container) return;
    
    if (bookmarks.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <i class="fas fa-bookmark fa-4x" style="color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #7f8c8d;">Закладок пока нет</h3>
                <p>Добавляйте книги в закладки на главной странице</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    bookmarks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover">
                <i class="fas fa-book"></i>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">
                    ${book.author.lname} ${book.author.name} ${book.author.patronymic}
                </p>
                <span class="book-genre">${book.genre.name}</span>
                <div class="book-actions">
                    <button class="btn btn-danger" onclick="removeFromBookmarks(${book.bookID})">
                        <i class="fas fa-trash"></i> Удалить из закладок
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(bookCard);
    });
}

function removeFromBookmarks(bookId) {
    bookmarks = bookmarks.filter(b => b.bookID !== bookId);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
    showNotification('Книга удалена из закладок', 'info');
}

function setupAdminPage() {
    renderAdminBooksList();
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-remove')) {
            const bookId = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Вы уверены, что хотите удалить эту книгу?')) {
                removeBook(bookId);
            }
        }
    });
}

async function renderAdminBooksList() {
    const container = document.querySelector('.books-list-admin');
    if (!container) return;
    
    try {
        // Тут бдет реальный запрос: const response = await fetch(`${API_BASE_URL}/home`);
        // const books = await response.json();
        
        const books = mockBooks;
        
        container.innerHTML = `
            <h2 style="margin-bottom: 20px;">Управление книгами</h2>
            ${books.map(book => `
                <div class="book-item-admin">
                    <div>
                        <h4>${book.title}</h4>
                        <p>${book.author.lname} ${book.author.name} - ${book.genre.name}</p>
                    </div>
                    <button class="btn btn-danger btn-remove" data-id="${book.bookID}">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            `).join('')}
        `;
    } catch (error) {
        console.error('Ошибка загрузки книг для админа:', error);
    }
}

async function removeBook(bookId) {
    try {
        // Тут будет реальный запрос: await fetch(`${API_BASE_URL}/admin/removebook/${bookId}`, {
        //     method: 'DELETE'
        // });
        
        mockBooks = mockBooks.filter(book => book.bookID !== bookId);
        renderAdminBooksList();
        showNotification('Книга успешно удалена', 'success');
    } catch (error) {
        console.error('Ошибка удаления книги:', error);
        showNotification('Ошибка удаления книги', 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#2ecc71';
            break;
        case 'error':
            notification.style.backgroundColor = '#e74c3c';
            break;
        default:
            notification.style.backgroundColor = '#3498db';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.toggleBookmark = toggleBookmark;
window.viewBookDetails = viewBookDetails;
window.removeFromBookmarks = removeFromBookmarks;