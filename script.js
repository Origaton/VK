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

    if (mediaType === 'photo') {
        fullMedia.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #e7e8ec; color: #999;">
                ${mediaText}
            </div>`;
    } else if (mediaType === 'video') {
        fullMedia.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #333; color: #fff; position: relative;">
                <div style="font-size: 24px;">${mediaText}</div>
                <div style="position: absolute; font-size: 50px; color: white; text-shadow: 0 0 10px rgba(0,0,0,0.5);">▶</div>
            </div>`;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('mediaModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    const modal = document.getElementById('mediaModal');
    if (event.target == modal) {
        closeModal();
    }
}