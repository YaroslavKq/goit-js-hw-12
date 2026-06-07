import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const searchFormElement = document.querySelector('.form');
const loadMoreBtnElement = document.querySelector('.load-more-btn');

let currentSearchWord = '';
let currentActivePage = 1;
const itemsPerPage = 15;

searchFormElement.addEventListener('submit', handleSearchSubmit);
loadMoreBtnElement.addEventListener('click', handleLoadMoreRequest);

async function handleSearchSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  currentSearchWord = form.elements.searchQuery.value.trim();

  if (currentSearchWord === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search keyword!',
      position: 'topRight',
    });
    return;
  }

  currentActivePage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentSearchWord, currentActivePage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (data.totalHits > itemsPerPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Failure',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMoreRequest() {
  currentActivePage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentSearchWord, currentActivePage);

    createGallery(data.hits);
    smoothPageScroll();

    const totalLoadedImages = currentActivePage * itemsPerPage;
    if (totalLoadedImages >= data.totalHits) {
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Failed to fetch more images: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothPageScroll() {
  const firstGalleryCard = document.querySelector('.gallery-item');
  if (firstGalleryCard) {
    const { height: cardHeight } = firstGalleryCard.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
