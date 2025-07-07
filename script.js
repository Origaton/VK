document.addEventListener('DOMContentLoaded', function () {
    // Инициализация элементов
    const modal = document.getElementById('mediaModal');
    const closeBtn = document.querySelector('.close');
    const fullMedia = document.getElementById('fullMedia');
    const mediaContainer = document.querySelector('.media-container');

    // Проверка существования критических элементов
    if (!modal || !closeBtn || !fullMedia || !mediaContainer) {
        console.error('Не найдены необходимые элементы для модального окна');
        return;
    }

    // Функция открытия модального окна
    function openModal(imagePath) {
        console.log('Opening image:', imagePath); // Логирование для отладки

        // Создаем новое изображение для предварительной загрузки
        const img = new Image();
        img.src = imagePath;
        img.alt = "Увеличенное изображение";
        img.className = 'full-media';
        img.onload = function () {
            // Очищаем контейнер и добавляем загруженное изображение
            mediaContainer.innerHTML = '';
            mediaContainer.appendChild(img);

            // Показываем модальное окно
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        img.onerror = function () {
            console.error('Ошибка загрузки изображения:', imagePath);
            mediaContainer.innerHTML = `
                <div class="error-message">
                    Не удалось загрузить изображение
                    <p>${imagePath}</p>
                </div>
            `;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    }

    // Функция закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Обработчики для всех элементов с атрибутом data-full
    document.querySelectorAll('[data-full]').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const fullImagePath = this.getAttribute('data-full');
            openModal(fullImagePath);
        });
    });

    // Обработчики для фотографий в постах (если они используют просто img)
    document.querySelectorAll('.post-photo img').forEach(img => {
        img.parentElement.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(img.src);
        });
    });

    // Закрытие по кнопке
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне окна
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Переключение вкладок (фото/видео)
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function () {
            // Удаляем активный класс у всех кнопок
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Добавляем активный класс текущей кнопке
            this.classList.add('active');

            // Переключаем отображение каруселей
            const tabType = this.textContent.trim().toLowerCase();
            const photosCarousel = document.getElementById('photos-carousel');
            const videosCarousel = document.getElementById('videos-carousel');

            if (photosCarousel && videosCarousel) {
                photosCarousel.style.display =
                    tabType === 'фото' ? 'flex' : 'none';
                videosCarousel.style.display =
                    tabType === 'видео' ? 'flex' : 'none';
            }
        });
    });

    // Инициализация первой вкладки как активной
    const defaultTab = document.querySelector('.tab-button.active');
    if (defaultTab) {
        defaultTab.click();
    }
});