// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    // Инициализируем модальное окно
    initModal();

    // Назначаем обработчики для всех фото и видео элементов
    setupMediaItems();

    // Назначаем обработчики для табов
    setupTabs();
});

function initModal() {
    // Создаем структуру модального окна, если ее нет
    if (!document.getElementById('mediaModal')) {
        const modalHTML = `
        <div id="mediaModal" class="modal">
            <span class="close">&times;</span>
            <div class="modal-content">
                <div class="media-container">
                    <div id="fullMedia"></div>
                </div>
                <div class="comments-container">
                    <h3 class="comments-title">Комментарии</h3>
                    <div class="comment">
                        <div class="comment-author">Мария Петрова</div>
                        <div class="comment-text">Отличное фото/видео!</div>
                        <div class="comment-date">5 минут назад</div>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Назначаем обработчики для модального окна
    document.querySelector('.close').addEventListener('click', closeModal);
}

function setupMediaItems() {
    // Загружаем превью и настраиваем обработчики
    document.querySelectorAll('.photo-item, .video-item').forEach(item => {
        const previewUrl = item.dataset.preview;
        const img = item.querySelector('.media-preview');

        // Загружаем превью
        if (img && previewUrl) {
            img.src = previewUrl;
        }

        // Обработчик клика
        item.addEventListener('click', function () {
            const mediaType = this.classList.contains('photo-item') ? 'photo' : 'video';
            const mediaUrl = mediaType === 'photo' ? this.dataset.full : this.dataset.src;
            openModal(mediaUrl, mediaType);
        });
    });
}


function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const tabName = this.textContent.toLowerCase();
            showTab(tabName === 'фото' ? 'photos' : 'videos');
        });
    });
}

function showTab(tabName) {
    const photosCarousel = document.getElementById('photos-carousel');
    const videosCarousel = document.getElementById('videos-carousel');
    const tabButtons = document.querySelectorAll('.tab-button');

    if (tabName === 'photos') {
        photosCarousel.style.display = 'flex';
        videosCarousel.style.display = 'none';
        tabButtons[0].classList.add('active');
        tabButtons[1].classList.remove('active');
    } else {
        photosCarousel.style.display = 'none';
        videosCarousel.style.display = 'flex';
        tabButtons[0].classList.remove('active');
        tabButtons[1].classList.add('active');
    }
}

function openModal(mediaUrl, mediaType) {
    const modal = document.getElementById('mediaModal');
    const fullMedia = document.getElementById('fullMedia');

    if (!modal || !fullMedia) {
        console.error('Модальное окно не инициализировано');
        return;
    }

    if (mediaType === 'photo') {
        fullMedia.innerHTML = `
            <img src="${mediaUrl}" 
                 alt="Увеличенное фото" 
                 class="full-media-content">`;
    } else {
        fullMedia.innerHTML = `
            <video controls autoplay class="full-media-content">
                <source src="${mediaUrl}" type="video/mp4">
                Ваш браузер не поддерживает видео.
            </video>`;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('mediaModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие по клику вне модального окна
document.addEventListener('click', function (event) {
    const modal = document.getElementById('mediaModal');
    if (event.target === modal) {
        closeModal();
    }
});