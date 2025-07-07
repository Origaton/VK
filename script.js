// Ожидаем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    let modal;
    let closeBtn;
    let fullMedia;
    let commentsContainer;

    // Инициализация модального окна
    function initModal() {
        // Создаем структуру модального окна
        const modalHTML = `
        <div id="mediaModal" class="modal">
            <div class="modal-content">
                <span class="close"></span>
                <div class="media-container">
                    <img id="fullMedia" class="full-media">
                </div>
                <div class="comments-container">
                    <h3 class="comments-title">Комментарии</h3>
                    <div class="comment-list">
                        <!-- Комментарии будут добавляться здесь -->
                    </div>
                </div>
            </div>
        </div>`;
        
        // Добавляем модальное окно в DOM
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Получаем ссылки на элементы
        modal = document.getElementById('mediaModal');
        closeBtn = document.querySelector('.close');
        fullMedia = document.getElementById('fullMedia');
        commentsContainer = document.querySelector('.comment-list');
    }

    // Открытие модального окна
    function openModal(imageSrc, imageAlt = 'Изображение') {
        // Устанавливаем изображение
        fullMedia.src = imageSrc;
        fullMedia.alt = imageAlt;
        
        // Генерируем комментарии
        generateComments();
        
        // Показываем модальное окно
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Закрытие модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Генерация комментариев
    function generateComments() {
        const comments = [
            {
                author: 'Мария Петрова',
                text: 'Отличное фото! Где это было сделано?',
                date: '5 минут назад'
            },
            {
                author: 'Алексей Смирнов',
                text: 'Классный вид! Хочу там побывать.',
                date: '2 часа назад'
            },
            {
                author: 'Елена Иванова',
                text: 'Ты отлично выглядишь на этом фото!',
                date: 'вчера в 18:30'
            }
        ];

        // Очищаем контейнер
        commentsContainer.innerHTML = '';

        // Добавляем комментарии
        comments.forEach(comment => {
            const commentHTML = `
            <div class="comment">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-date">${comment.date}</div>
            </div>`;
            commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
        });
    }

    // Назначение обработчиков событий
    function setupEventListeners() {
        // Закрытие по кнопке
        closeBtn.addEventListener('click', closeModal);

        // Закрытие по клику вне окна
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Обработчики для фотографий
        document.querySelectorAll('.photo-item, .post-photo').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img') || this;
                const imgSrc = this.dataset.full || img.src;
                const imgAlt = img.alt || 'Фотография';
                openModal(imgSrc, imgAlt);
            });
        });

        // Переключение вкладок (фото/видео)
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                const tabType = this.textContent.trim().toLowerCase();
                document.getElementById('photos-carousel').style.display = 
                    tabType === 'фото' ? 'flex' : 'none';
                document.getElementById('videos-carousel').style.display = 
                    tabType === 'видео' ? 'flex' : 'none';
            });
        });
    }

    // Инициализация по умолчанию
    function initDefaults() {
        // Активируем первую вкладку
        const defaultTab = document.querySelector('.tab-button.active');
        if (defaultTab) {
            defaultTab.click();
        }
    }

    // Основная инициализация
    initModal();
    setupEventListeners();
    initDefaults();
});