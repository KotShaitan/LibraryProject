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
        },
        description: "Великий роман о судьбах людей в эпоху наполеоновских войн.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.`
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
        },
        description: "Психологический роман о преступлении и моральных муках.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus.

Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci.

Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis.

Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi.`
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
        },
        description: "Мистический роман о дьяволе, посетившем Москву 1930-х годов.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.

Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.

Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.`
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
        },
        description: "Роман-антиутопия о тоталитарном обществе будущего.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Nulla vitae elit libero, a pharetra augue.

Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

Cras mattis consectetur purus sit amet fermentum. Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur.

Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
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
        },
        description: "Первая книга о юном волшебнике Гарри Поттере.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.

Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus auctor fringilla.

Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id dolor id nibh ultricies vehicula ut id elit.`
    },

    {
        bookID: 6,
        title: "Три мушкетера",
        author: {
            name: "Александр",
            lname: "Дюма",
            patronymic: ""
        },
        genre: {
            name: "Приключения"
        },
        description: "Приключения гасконца д'Артаньяна в Париже.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.`
    },
    {
        bookID: 7,
        title: "Маленький принц",
        author: {
            name: "Антуан",
            lname: "де Сент-Экзюпери",
            patronymic: ""
        },
        genre: {
            name: "Философская сказка"
        },
        description: "Философская сказка о маленьком принце с другой планеты.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.`
    },
    {
        bookID: 8,
        title: "Анна Каренина",
        author: {
            name: "Лев",
            lname: "Толстой",
            patronymic: "Николаевич"
        },
        genre: {
            name: "Роман"
        },
        description: "Роман о трагической любви замужней женщины.",
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus.`
    }
];

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

function getRecommendedBooks() {
    const bookmarkedIds = bookmarks.map(b => b.bookID);
    return mockBooks
        .filter(book => !bookmarkedIds.includes(book.bookID))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3); 
}

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
                <p class="book-description">${book.description || ''}</p>
                <div class="book-actions">
                    <button class="btn btn-bookmark ${isBookmarked ? 'added' : ''}" 
                            data-id="${book.bookID}">
                        <i class="fas ${isBookmarked ? 'fa-check' : 'fa-bookmark'}"></i>
                        ${isBookmarked ? 'В закладках' : 'В закладки'}
                    </button>
                    <button class="btn btn-read" onclick="openBookText(${book.bookID})">
                        <i class="fas fa-book-open"></i> Читать
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

function openBookText(bookId) {
    const book = mockBooks.find(b => b.bookID === bookId);
    if (book) {
        showBookTextModal(book);
    }
}

function showBookTextModal(book) {
    const modal = document.createElement('div');
    modal.className = 'modal book-text-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content book-text-content">
            <span class="close close-book-text">&times;</span>
            <div class="book-text-header">
                <h2><i class="fas fa-book-open"></i> ${book.title}</h2>
                <p class="book-text-author">${book.author.lname} ${book.author.name} ${book.author.patronymic}</p>
                <span class="book-text-genre">${book.genre.name}</span>
            </div>
            <div class="book-text-body">
                <div class="book-text-container">
                    ${book.fullText || 'Текст книги пока не добавлен.'}
                </div>
            </div>
            <div class="book-text-actions">
                <button class="btn btn-bookmark" onclick="toggleBookmarkFromModal(${book.bookID})">
                    <i class="fas ${bookmarks.some(b => b.bookID === book.bookID) ? 'fa-check' : 'fa-bookmark'}"></i>
                    ${bookmarks.some(b => b.bookID === book.bookID) ? 'В закладках' : 'Добавить в закладки'}
                </button>
                <button class="btn" onclick="closeBookTextModal()">
                    <i class="fas fa-times"></i> Закрыть
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);

    modal.querySelector('.close-book-text').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

function closeBookTextModal() {
    const modal = document.querySelector('.book-text-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function toggleBookmarkFromModal(bookId) {
    toggleBookmark(bookId);

    const modal = document.querySelector('.book-text-modal');
    if (modal) {
        const button = modal.querySelector('.btn-bookmark');
        const isBookmarked = bookmarks.some(b => b.bookID === bookId);
        
        button.innerHTML = `
            <i class="fas ${isBookmarked ? 'fa-check' : 'fa-bookmark'}"></i>
            ${isBookmarked ? 'В закладках' : 'Добавить в закладки'}
        `;
        
        if (isBookmarked) {
            button.classList.add('added');
        } else {
            button.classList.remove('added');
        }
    }
}

async function toggleBookmark(bookId) {
    const book = mockBooks.find(b => b.bookID === bookId);
    const isBookmarked = bookmarks.some(b => b.bookID === bookId);
    
    if (isBookmarked) {
        try {
            bookmarks = bookmarks.filter(b => b.bookID !== bookId);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            showNotification('Книга удалена из закладок', 'info');
        } catch (error) {
            console.error('Ошибка удаления из закладок:', error);
            showNotification('Ошибка удаления из закладок', 'error');
        }
    } else {
        try {
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
            book.genre.name.toLowerCase().includes(searchTerm) ||
            (book.description && book.description.toLowerCase().includes(searchTerm))
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
        },
        description: document.getElementById('bookDescription').value || '',
        fullText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
    };
    
    try {
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

function setupBookmarksPage() {
    renderBookmarks();
}

function renderBookmarks() {
    const container = document.querySelector('.bookmarks-container');
    if (!container) return;
    
    if (bookmarks.length === 0) {
        container.innerHTML = `
            <div class="empty-bookmarks">
                <i class="fas fa-bookmark fa-4x"></i>
                <h3>Закладок пока нет</h3>
                <p>Добавляйте книги в закладки на главной странице</p>
            </div>
        `;
    } else {
        container.innerHTML = '';
        const bookmarksSection = document.createElement('div');
        bookmarksSection.className = 'bookmarks-section';
        bookmarksSection.innerHTML = `
            <h2><i class="fas fa-bookmark"></i> Ваши закладки (${bookmarks.length})</h2>
            <div class="bookmarks-grid">
                ${bookmarks.map(book => `
                    <div class="book-card">
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
                                <button class="btn btn-read" onclick="openBookText(${book.bookID})">
                                    <i class="fas fa-book-open"></i> Читать
                                </button>
                                <button class="btn btn-danger" onclick="removeFromBookmarks(${book.bookID})">
                                    <i class="fas fa-trash"></i> Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(bookmarksSection);
    }

    const recommendedBooks = getRecommendedBooks();
    if (recommendedBooks.length > 0) {
        const recommendedSection = document.createElement('div');
        recommendedSection.className = 'recommended-section';
        recommendedSection.innerHTML = `
            <h2><i class="fas fa-star"></i> Рекомендуем к прочтению</h2>
            <p class="recommended-description">Вам могут понравиться эти книги:</p>
            <div class="recommended-grid">
                ${recommendedBooks.map(book => `
                    <div class="book-card recommended-card">
                        <div class="book-cover">
                            <i class="fas fa-book"></i>
                        </div>
                        <div class="book-info">
                            <h3 class="book-title">${book.title}</h3>
                            <p class="book-author">
                                ${book.author.lname} ${book.author.name} ${book.author.patronymic}
                            </p>
                            <span class="book-genre">${book.genre.name}</span>
                            <p class="book-description">${book.description || ''}</p>
                            <div class="book-actions">
                                <button class="btn btn-bookmark" onclick="toggleBookmark(${book.bookID})">
                                    <i class="fas fa-bookmark"></i> В закладки
                                </button>
                                <button class="btn btn-read" onclick="openBookText(${book.bookID})">
                                    <i class="fas fa-book-open"></i> Читать
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(recommendedSection);
    }
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
        const books = mockBooks;
        
        container.innerHTML = `
            <h2>Управление книгами</h2>
            ${books.map(book => `
                <div class="book-item-admin">
                    <div>
                        <h4>${book.title}</h4>
                        <p>${book.author.lname} ${book.author.name} - ${book.genre.name}</p>
                        <small>${book.description || 'Без описания'}</small>
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
        mockBooks = mockBooks.filter(book => book.bookID !== bookId);
        bookmarks = bookmarks.filter(book => book.bookID !== bookId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        renderAdminBooksList();
        showNotification('Книга успешно удалена', 'success');
    } catch (error) {
        console.error('Ошибка удаления книги:', error);
        showNotification('Ошибка удаления книги', 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    
    .notification.success {
        background-color: #2ecc71;
        border-left: 4px solid #27ae60;
    }
    
    .notification.error {
        background-color: #e74c3c;
        border-left: 4px solid #c0392b;
    }
    
    .notification.info {
        background-color: #3498db;
        border-left: 4px solid #2980b9;
    }
    
    .book-text-modal .modal-content {
        max-width: 800px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
    }
    
    .book-text-header {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    
    .book-text-author {
        color: #7f8c8d;
        margin: 5px 0;
    }
    
    .book-text-genre {
        display: inline-block;
        background-color: #e8f4fc;
        color: #3498db;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.9rem;
    }
    
    .book-text-body {
        flex: 1;
        overflow-y: auto;
        margin: 15px 0;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 8px;
        line-height: 1.8;
        font-size: 1.05rem;
        color: #333;
    }
    
    .book-text-container {
        white-space: pre-wrap;
        font-family: 'Georgia', serif;
    }
    
    .book-text-actions {
        display: flex;
        gap: 15px;
        padding-top: 15px;
        border-top: 1px solid #eee;
    }
    
    .btn-read {
        background-color: #9b59b6;
        color: white;
        flex: 1;
    }
    
    .btn-read:hover {
        background-color: #8e44ad;
    }
    
    .empty-bookmarks {
        text-align: center;
        padding: 60px 20px;
        color: #7f8c8d;
    }
    
    .empty-bookmarks i {
        color: #ddd;
        margin-bottom: 20px;
    }
    
    .bookmarks-section, .recommended-section {
        margin-bottom: 40px;
    }
    
    .bookmarks-grid, .recommended-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
        margin-top: 20px;
    }
    
    .recommended-section {
        background-color: #f8f9fa;
        padding: 25px;
        border-radius: 12px;
        border-left: 5px solid #f1c40f;
    }
    
    .recommended-description {
        color: #666;
        margin-bottom: 20px;
    }
    
    .book-description {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 10px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

window.toggleBookmark = toggleBookmark;
window.openBookText = openBookText;
window.removeFromBookmarks = removeFromBookmarks;
window.closeBookTextModal = closeBookTextModal;
window.toggleBookmarkFromModal = toggleBookmarkFromModal;