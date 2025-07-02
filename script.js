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

function openModal(mediaText, mediaId, mediaType) {
    const modal = document.getElementById('mediaModal');
    const fullMedia = document.getElementById('fullMedia');

    fullMedia.innerHTML = `
                <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e7e8ec;color:#999">
                    ${mediaText}
                    <!-- Для реального фото замените div выше на:
                    <img src="ВАША_ССЫЛКА_НА_ФОТО" style="max-width:100%;max-height:70vh;object-fit:contain;"> -->
                </div>`;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('mediaModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function (event) {
    const modal = document.getElementById('mediaModal');
    if (event.target == modal) {
        closeModal();
    }
}