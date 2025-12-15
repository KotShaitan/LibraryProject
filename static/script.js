// Основные глобальные переменные
let currentBooks = [];
let allGenres = new Set();

let bookmarkedBookIds = new Set();

// Функция для загрузки ID книг в закладках
async function loadBookmarkedIds() {
    try {
        const response = await fetch('/api/bookmark');
        if (response.ok) {
            const bookmarks = await response.json();
            // Извлекаем только ID книг
            bookmarkedBookIds = new Set(bookmarks.map(book => book.bookID));
        }
    } catch (error) {
        console.error('Ошибка загрузки закладок для проверки:', error);
    }
}

// DOM элементы
const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const genreFilter = document.getElementById('genreFilter');
const sortSelect = document.getElementById('sortSelect');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Инициализация страницы
async function initializePage() {
    try {
        // Загружаем ID книг в закладках ПЕРЕД загрузкой страницы
        await loadBookmarkedIds();
        
        // Определяем текущую страницу
        const path = window.location.pathname;
        
        if (path === '/bookmark') {
            await loadBookmarks();
        } else if (path === '/admin') {
            await loadAdminPage();
        } else {
            await loadHomePage();
        }
        
        // Инициализируем общие обработчики событий
        initializeEventHandlers();
    } catch (error) {
        console.error('Ошибка при инициализации страницы:', error);
        showError('Произошла ошибка при загрузке данных');
    }
}
// Загрузка главной страницы
async function loadHomePage() {
    try {
        const response = await fetch('/api/home');
        if (!response.ok) throw new Error('Ошибка загрузки книг');
        
        const books = await response.json();
        currentBooks = books;
        
        // Извлекаем все жанры
        updateGenresList(books);
        
        // Отображаем книги
        displayBooks(books);
        
        // Если есть поисковая строка - настраиваем обработчики
        if (searchInput && searchBtn) {
            setupSearchHandlers();
        }
        
    } catch (error) {
        console.error('Ошибка загрузки главной страницы:', error);
        showError('Не удалось загрузить книги');
    }
}

// Загрузка страницы закладок
async function loadBookmarks() {
    try {
        const response = await fetch('/api/bookmark');
        if (!response.ok) throw new Error('Ошибка загрузки закладок');
        
        const bookmarks = await response.json();
        
        // Отображаем закладки
        displayBookmarks(bookmarks);
        
        // Загружаем рекомендацию
        await loadRecommendation();
        
    } catch (error) {
        console.error('Ошибка загрузки закладок:', error);
        showError('Не удалось загрузить закладки');
    }
}

// Загрузка рекомендации
async function loadRecommendation() {
    try {
        const response = await fetch('/api/recommend');
        if (!response.ok) throw new Error('Ошибка загрузки рекомендации');
        
        const recommendation = await response.json();
        
        // Отображаем рекомендацию
        displayRecommendation(recommendation);
        
    } catch (error) {
        console.error('Ошибка загрузки рекомендации:', error);
        // Скрываем блок рекомендаций при ошибке
        const recommendedSection = document.querySelector('.recommended-section');
        if (recommendedSection) {
            recommendedSection.style.display = 'none';
        }
    }
}

// Загрузка страницы администратора
async function loadAdminPage() {
    try {
        const response = await fetch('/api/admin');
        if (!response.ok) throw new Error('Ошибка загрузки книг для администрирования');
        
        const books = await response.json();
        
        // Отображаем книги в админке
        displayAdminBooks(books);
        
        // Настраиваем обработчики для админки
        setupAdminHandlers();
        
    } catch (error) {
        console.error('Ошибка загрузки админ-страницы:', error);
        showError('Не удалось загрузить данные для администрирования');
    }
}

// Обновление списка жанров
function updateGenresList(books) {
    if (!genreFilter) return;
    
    allGenres.clear();
    books.forEach(book => {
        if (book.genre && book.genre.name) {
            allGenres.add(book.genre.name);
        }
    });
    
    // Очищаем и добавляем опции
    genreFilter.innerHTML = '<option value="">Все жанры</option>';
    allGenres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Отображение книг на главной странице
function displayBooks(books) {
    if (!booksContainer) return;
    
    if (books.length === 0) {
        booksContainer.innerHTML = '<div class="empty-message"><p>Книги не найдены</p></div>';
        return;
    }
    
    booksContainer.innerHTML = '';
    
    books.forEach(book => {
        const bookElement = createBookCard(book, 'home');
        booksContainer.appendChild(bookElement);
    });
}

// Отображение закладок
function displayBookmarks(bookmarks) {
    const bookmarksContainer = document.querySelector('.bookmarks-container');
    if (!bookmarksContainer) return;
    
    if (bookmarks.length === 0) {
        bookmarksContainer.innerHTML = `
            <div class="empty-bookmarks">
                <i class="fas fa-bookmark"></i>
                <h3>Закладок пока нет</h3>
                <p>Добавляйте книги в закладки, чтобы они отображались здесь</p>
                <a href="/" class="btn btn-primary" style="margin-top: 20px;">
                    <i class="fas fa-book"></i> Перейти к книгам
                </a>
            </div>
        `;
        return;
    }
    
    // Создаем сетку для закладок
    const bookmarksGrid = document.createElement('div');
    bookmarksGrid.className = 'bookmarks-grid';
    
    bookmarks.forEach(book => {
        const bookElement = createBookCard(book, 'bookmark');
        bookmarksGrid.appendChild(bookElement);
    });
    
    bookmarksContainer.innerHTML = `
        <div class="bookmarks-section">
            <h2><i class="fas fa-bookmark"></i> Книги в закладках (${bookmarks.length})</h2>
        </div>
    `;
    bookmarksContainer.appendChild(bookmarksGrid);
}

// Отображение рекомендации
function displayRecommendation(recommendation) {
    const bookmarksContainer = document.querySelector('.bookmarks-container');
    if (!bookmarksContainer) return;
    
    if (!recommendation || Object.keys(recommendation).length === 0) {
        // Если нет рекомендации, просто выходим
        return;
    }
    
    // Создаем секцию для рекомендации
    const recommendedSection = document.createElement('div');
    recommendedSection.className = 'recommended-section';
    
    recommendedSection.innerHTML = `
        <h2><i class="fas fa-star"></i> Рекомендуем к прочтению</h2>
        <p class="recommended-description">На основе ваших закладок мы подобрали книгу, которая может вам понравиться</p>
        <div class="recommended-grid"></div>
    `;
    
    // Добавляем рекомендованную книгу
    const recommendedGrid = recommendedSection.querySelector('.recommended-grid');
    const bookElement = createBookCard(recommendation, 'recommendation');
    recommendedGrid.appendChild(bookElement);
    
    // Вставляем рекомендацию перед закладками
    const bookmarksSection = bookmarksContainer.querySelector('.bookmarks-section');
    if (bookmarksSection) {
        bookmarksContainer.insertBefore(recommendedSection, bookmarksSection);
    } else {
        bookmarksContainer.prepend(recommendedSection);
    }
}

// Отображение книг в админке
function displayAdminBooks(books) {
    const booksListAdmin = document.querySelector('.books-list-admin');
    if (!booksListAdmin) return;
    
    if (books.length === 0) {
        booksListAdmin.innerHTML = '<p>Нет книг в библиотеке</p>';
        return;
    }
    
    let html = '';
    books.forEach(book => {
        const authorName = book.author ? 
            `${book.author.lname || ''} ${book.author.name || ''} ${book.author.patronymic || ''}`.trim() 
            : 'Неизвестный автор';
        
        html += `
            <div class="book-item-admin" data-book-id="${book.bookID}">
                <div class="book-info-admin">
                    <h4>${book.title || 'Без названия'}</h4>
                    <p><strong>Автор:</strong> ${authorName}</p>
                    <p><strong>Жанр:</strong> ${book.genre?.name || 'Не указан'}</p>
                    <p><strong>ID:</strong> ${book.bookID}</p>
                </div>
                <div class="admin-actions">
                    <button class="btn btn-danger btn-remove-admin" data-book-id="${book.bookID}">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </div>
        `;
    });
    
    booksListAdmin.innerHTML = html;
}

// Создание карточки книги
function createBookCard(book, context = 'home') {
    const card = document.createElement('div');
    card.className = 'book-card';
    if (context === 'recommendation') {
        card.classList.add('recommended-card');
    }
    card.dataset.bookId = book.bookID;
    
    // Проверяем, находится ли книга в закладках
    const isInBookmarks = bookmarkedBookIds.has(book.bookID);
    
    // Получаем полное имя автора
    const authorFullName = getAuthorFullName(book.author);
    
    // Получаем первые несколько предложений текста для описания
    const shortDescription = getShortDescription(book.fullText || '');
    
    // Определяем цвет обложки на основе жанра
    const coverColor = getCoverColor(book.genre?.name || '');
    
    card.innerHTML = `
        <div class="book-cover" style="background: ${coverColor};">
            <i class="fas fa-book-open"></i>
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title || 'Без названия'}</h3>
            <p class="book-author"><i class="fas fa-user-pen"></i> ${authorFullName}</p>
            <span class="book-genre">${book.genre?.name || 'Без жанра'}</span>
            <p class="book-description">${shortDescription}</p>
            <div class="book-actions">
                ${context === 'bookmark' ? `
                    <button class="btn btn-danger btn-remove-bookmark" data-book-id="${book.bookID}">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                ` : `
                    <button class="btn btn-bookmark btn-add-bookmark ${isInBookmarks ? 'added disabled' : ''}" 
                            data-book-id="${book.bookID}"
                            ${isInBookmarks ? 'disabled' : ''}>
                        <i class="fas ${isInBookmarks ? 'fa-check' : 'fa-bookmark'}"></i> 
                        ${isInBookmarks ? 'В закладках' : 'В закладки'}
                    </button>
                `}
                <button class="btn btn-details btn-view-details" data-book-id="${book.bookID}">
                    <i class="fas fa-book-open"></i> Читать
                </button>
            </div>
        </div>
    `;
    
    return card;
}
// Инициализация обработчиков событий
function initializeEventHandlers() {
    // Обработчики фильтров
    if (genreFilter) {
        genreFilter.addEventListener('change', handleFilterChange);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    
    // Обработчики кнопок в карточках книг
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Добавление/удаление закладки
        if (target.closest('.btn-add-bookmark')) {
            const button = target.closest('.btn-add-bookmark');
            const bookId = button.dataset.bookId;
            addToBookmark(bookId);
        }
        
        if (target.closest('.btn-remove-bookmark')) {
            const button = target.closest('.btn-remove-bookmark');
            const bookId = button.dataset.bookId;
            removeFromBookmark(bookId);
        }
        
        // Чтение книги
        if (target.closest('.btn-view-details')) {
            const button = target.closest('.btn-view-details');
            const bookId = button.dataset.bookId;
            viewBookDetails(bookId);
        }
    });
}

// Настройка обработчиков поиска
function setupSearchHandlers() {
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

// Настройка обработчиков для админки
function setupAdminHandlers() {
    // Обработчик кнопки "Добавить книгу"
    const addBookBtn = document.getElementById('addBookBtn');
    if (addBookBtn) {
        addBookBtn.addEventListener('click', function() {
            openAddBookModal();
        });
    }
    
    // Обработчик модального окна
    const modal = document.getElementById('addBookModal');
    const closeBtn = modal?.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Обработчик формы добавления книги
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewBook();
        });
    }
    
    // Обработчик удаления книг в админке
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-remove-admin')) {
            const button = e.target.closest('.btn-remove-admin');
            const bookId = button.dataset.bookId;
            removeBookAdmin(bookId);
        }
    });
}

// Обработчик поиска
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayBooks(currentBooks);
        return;
    }
    
    const filteredBooks = currentBooks.filter(book => {
        const title = book.title?.toLowerCase() || '';
        const author = getAuthorFullName(book.author).toLowerCase();
        const genre = book.genre?.name?.toLowerCase() || '';
        
        return title.includes(searchTerm) || 
               author.includes(searchTerm) || 
               genre.includes(searchTerm);
    });
    
    displayBooks(filteredBooks);
}

// Обработчик изменения фильтра по жанру
function handleFilterChange() {
    const selectedGenre = genreFilter.value;
    
    if (!selectedGenre) {
        displayBooks(currentBooks);
        return;
    }
    
    const filteredBooks = currentBooks.filter(book => 
        book.genre?.name === selectedGenre
    );
    
    displayBooks(filteredBooks);
}

// Обработчик сортировки
function handleSortChange() {
    const sortBy = sortSelect.value;
    let sortedBooks = [...currentBooks];
    
    switch (sortBy) {
        case 'title':
            sortedBooks.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            break;
        case 'title_desc':
            sortedBooks.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
            break;
        case 'author':
            sortedBooks.sort((a, b) => 
                getAuthorFullName(a.author).localeCompare(getAuthorFullName(b.author))
            );
            break;
    }
    
    displayBooks(sortedBooks);
}

// Добавление в закладки
// Добавление в закладки
async function addToBookmark(bookId) {
    try {
        // Проверяем на клиенте
        if (bookmarkedBookIds.has(parseInt(bookId))) {
            showNotification('Книга уже в закладках', 'info');
            // Обновляем все кнопки этой книги
            updateBookmarkButtons(bookId, true);
            return;
        }
        
        const response = await fetch('/api/bookmark/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookID: parseInt(bookId) })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 409) { // Конфликт - уже в закладках
                showNotification('Книга уже в закладках', 'info');
                // Обновляем локальное состояние
                bookmarkedBookIds.add(parseInt(bookId));
                // Обновляем все кнопки этой книги
                updateBookmarkButtons(bookId, true);
                return;
            }
            throw new Error(errorData.message || 'Ошибка добавления в закладки');
        }
        
        // Добавляем ID книги в локальное множество
        bookmarkedBookIds.add(parseInt(bookId));
        
        // Обновляем все кнопки этой книги на странице
        updateBookmarkButtons(bookId, true);
        
        showNotification('Книга добавлена в закладки', 'success');
        
    } catch (error) {
        console.error('Ошибка добавления в закладки:', error);
        showNotification(error.message || 'Не удалось добавить книгу в закладки', 'error');
    }
}
// Удаление из закладок
async function removeFromBookmark(bookId) {
    try {
        const response = await fetch('/api/bookmark/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookID: parseInt(bookId) })
        });
        
        if (!response.ok) throw new Error('Ошибка удаления из закладок');
        
        // Удаляем ID книги из локального множества
        bookmarkedBookIds.delete(parseInt(bookId));
        
        // Если мы на странице закладок
        if (window.location.pathname === '/bookmark') {
            // Удаляем карточку из DOM
            const card = document.querySelector(`.book-card[data-book-id="${bookId}"]`);
            if (card) {
                card.remove();
            }
            
            // Проверяем, остались ли еще закладки
            const remainingCards = document.querySelectorAll('.book-card');
            if (remainingCards.length === 0) {
                await loadBookmarks();
            }
        } else {
            // На других страницах обновляем только кнопки
            updateBookmarkButtons(bookId, false);
        }
        
        showNotification('Книга удалена из закладок', 'success');
        
    } catch (error) {
        console.error('Ошибка удаления из закладок:', error);
        showNotification('Не удалось удалить книгу из закладок', 'error');
    }
}
// Просмотр деталей книги
async function viewBookDetails(bookId) {
    try {
        const response = await fetch(`/api/home/book/${bookId}/detail`);
        if (!response.ok) throw new Error('Ошибка загрузки книги');
        
        const book = await response.json();
        openBookTextModal(book);
        
    } catch (error) {
        console.error('Ошибка загрузки книги:', error);
        showNotification('Не удалось загрузить книгу', 'error');
    }
}
function updateBookmarkButtons(bookId, isBookmarked) {
    const buttons = document.querySelectorAll(`.btn-add-bookmark[data-book-id="${bookId}"]`);
    buttons.forEach(button => {
        if (isBookmarked) {
            button.innerHTML = '<i class="fas fa-check"></i> В закладках';
            button.classList.add('added', 'disabled');
            button.disabled = true;
        } else {
            button.innerHTML = '<i class="fas fa-bookmark"></i> В закладки';
            button.classList.remove('added', 'disabled');
            button.disabled = false;
        }
    });
}
// Открытие модального окна с текстом книги
// Открытие модального окна с текстом книги
async function openBookTextModal(book) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal book-text-modal';
    modal.id = 'bookTextModal';
    
    const authorFullName = getAuthorFullName(book.author);
    
    // Проверяем, находится ли книга в закладках
    const isInBookmarks = bookmarkedBookIds.has(book.bookID);
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="book-text-header">
                <h2>${book.title || 'Без названия'}</h2>
                <p class="book-text-author"><i class="fas fa-user-pen"></i> ${authorFullName}</p>
                <span class="book-text-genre">${book.genre?.name || 'Без жанра'}</span>
            </div>
            <div class="book-text-body">
                <div class="book-text-container">${book.fullText || 'Текст книги отсутствует'}</div>
            </div>
            <div class="book-text-actions">
                <button class="btn btn-bookmark btn-add-bookmark ${isInBookmarks ? 'added disabled' : ''}" 
                        data-book-id="${book.bookID}"
                        ${isInBookmarks ? 'disabled' : ''}>
                    <i class="fas ${isInBookmarks ? 'fa-check' : 'fa-bookmark'}"></i> 
                    ${isInBookmarks ? 'В закладках' : 'В закладки'}
                </button>
                <button class="btn btn-details close-text-modal">
                    <i class="fas fa-times"></i> Закрыть
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Обработчики для модального окна
    const closeBtn = modal.querySelector('.close');
    const closeTextBtn = modal.querySelector('.close-text-modal');
    
    closeBtn.onclick = () => modal.remove();
    closeTextBtn.onclick = () => modal.remove();
    
    // Закрытие при клике вне модального окна
    window.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
    
    // Обработчик кнопки добавления в закладки в модальном окне
    const bookmarkBtn = modal.querySelector('.btn-add-bookmark');
    if (bookmarkBtn && !isInBookmarks) {
        bookmarkBtn.onclick = async () => {
            await addToBookmark(book.bookID);
        };
    }
}
// Открытие модального окна добавления книги
function openAddBookModal() {
    const modal = document.getElementById('addBookModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Добавление новой книги
async function addNewBook() {
    try {
        const title = document.getElementById('bookTitle').value;
        const authorName = document.getElementById('authorName').value;
        const authorLname = document.getElementById('authorLname').value;
        const authorPatronymic = document.getElementById('authorPatronymic').value;
        const genre = document.getElementById('bookGenre').value;
        const fullText = document.getElementById('bookDescription').value || 'Текст книги отсутствует';
        
        if (!title || !authorName || !authorLname || !genre) {
            showNotification('Заполните все обязательные поля', 'error');
            return;
        }
        
        const bookData = {
            title: title,
            author: {
                name: authorName,
                lname: authorLname,
                patronymic: authorPatronymic
            },
            genre: genre,
            fullText: fullText
        };
        
        const response = await fetch('/api/admin/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });
        
        if (!response.ok) throw new Error('Ошибка добавления книги');
        
        // Закрываем модальное окно
        const modal = document.getElementById('addBookModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Очищаем форму
        document.getElementById('addBookForm').reset();
        
        // Перезагружаем список книг
        await loadAdminPage();
        
        showNotification('Книга успешно добавлена', 'success');
        
    } catch (error) {
        console.error('Ошибка добавления книги:', error);
        showNotification('Не удалось добавить книгу', 'error');
    }
}

// Удаление книги в админке
async function removeBookAdmin(bookId) {
    if (!confirm('Вы уверены, что хотите удалить эту книгу?')) {
        return;
    }
    
    try {
        const response = await fetch('/api/admin/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookID: parseInt(bookId) })
        });
        
        if (!response.ok) throw new Error('Ошибка удаления книги');
        
        // Удаляем книгу из DOM
        const bookItem = document.querySelector(`.book-item-admin[data-book-id="${bookId}"]`);
        if (bookItem) {
            bookItem.remove();
        }
        
        // Проверяем, остались ли еще книги
        const remainingBooks = document.querySelectorAll('.book-item-admin');
        if (remainingBooks.length === 0) {
            const booksListAdmin = document.querySelector('.books-list-admin');
            if (booksListAdmin) {
                booksListAdmin.innerHTML = '<p>Нет книг в библиотеке</p>';
            }
        }
        
        showNotification('Книга успешно удалена', 'success');
        
    } catch (error) {
        console.error('Ошибка удаления книги:', error);
        showNotification('Не удалось удалить книгу', 'error');
    }
}

// Вспомогательные функции

// Получение полного имени автора
function getAuthorFullName(author) {
    if (!author) return 'Неизвестный автор';
    
    const parts = [];
    if (author.lname) parts.push(author.lname);
    if (author.name) parts.push(author.name);
    if (author.patronymic) parts.push(author.patronymic);
    
    return parts.join(' ') || 'Неизвестный автор';
}

// Получение краткого описания
function getShortDescription(text, maxLength = 100) {
    if (!text || text === 'Текст книги отсутствует') {
        return 'Описание отсутствует';
    }
    
    // Убираем лишние пробелы и переносы строк
    const cleanText = text.replace(/\s+/g, ' ').trim();
    
    if (cleanText.length <= maxLength) {
        return cleanText;
    }
    
    // Ищем конец предложения
    const shortened = cleanText.substring(0, maxLength);
    const lastSpace = shortened.lastIndexOf(' ');
    const lastDot = Math.max(shortened.lastIndexOf('.'), shortened.lastIndexOf('!'), shortened.lastIndexOf('?'));
    
    const cutIndex = Math.max(lastDot > 0 ? lastDot + 1 : lastSpace);
    
    return cutIndex > 0 ? shortened.substring(0, cutIndex) + '...' : shortened + '...';
}

// Получение цвета обложки на основе жанра
function getCoverColor(genre) {
    const colors = {
        'Роман': 'linear-gradient(135deg, #3498db, #2ecc71)',
        'Фантастика': 'linear-gradient(135deg, #9b59b6, #3498db)',
        'Детектив': 'linear-gradient(135deg, #e74c3c, #f39c12)',
        'Поэзия': 'linear-gradient(135deg, #2ecc71, #3498db)',
        'Драма': 'linear-gradient(135deg, #f1c40f, #e67e22)',
        'Классика': 'linear-gradient(135deg, #34495e, #2c3e50)'
    };
    
    return colors[genre] || 'linear-gradient(135deg, #3498db, #2ecc71)';
}

// Показ уведомления
function showNotification(message, type = 'info') {
    // Проверяем, есть ли уже контейнер для уведомлений
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 300px;
        `;
        document.body.appendChild(container);
    }
    
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    // Добавляем анимации в стили
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
    }
}

// Показ ошибки
function showError(message) {
    const container = document.querySelector('.container') || document.body;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #f5c6cb;
        margin: 20px 0;
        text-align: center;
    `;
    
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
        <h3>Ошибка</h3>
        <p>${message}</p>
        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 10px;">
            <i class="fas fa-redo"></i> Попробовать снова
        </button>
    `;
    
    if (container === document.body) {
        container.prepend(errorDiv);
    } else {
        container.prepend(errorDiv);
    }
}