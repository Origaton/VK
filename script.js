function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('expandedImage');
    modal.style.display = 'flex';
    modalImg.src = src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Закрытие модального окна при клике вне изображения
window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target == modal) {
        closeModal();
    }
}