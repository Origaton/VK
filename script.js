function openModal(photoText, photoId) {
    const modal = document.getElementById('photoModal');
    const fullPhoto = document.getElementById('fullPhoto');

    // Здесь можно заменить на реальное изображение
    fullPhoto.innerHTML = `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #e7e8ec; color: #999;">${photoText}</div>`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    const modal = document.getElementById('photoModal');
    if (event.target == modal) {
        closeModal();
    }
}