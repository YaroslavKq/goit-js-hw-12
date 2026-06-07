import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const photoGalleryContainer = document.querySelector('.gallery');
const mainPageLoader = document.querySelector('.loader');
const loadMoreBtnElement = document.querySelector('.load-more-btn');

const lightboxInstance = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info-block">
        <p class="info-item"><b>Likes</b><span>${likes}</span></p>
        <p class="info-item"><b>Views</b><span>${views}</span></p>
        <p class="info-item"><b>Comments</b><span>${comments}</span></p>
        <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
      </div>
    </li>
  `
    )
    .join('');

  photoGalleryContainer.insertAdjacentHTML('beforeend', markup);

  lightboxInstance.refresh();
}

export function clearGallery() {
  photoGalleryContainer.innerHTML = '';
}

export function showLoader() {
  mainPageLoader.classList.remove('is-hidden');
}

export function hideLoader() {
  mainPageLoader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtnElement.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtnElement.classList.add('is-hidden');
}
