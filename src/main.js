import './css/styles.css';
import { imageTemplate, imagesTemplate, renderImages, smoothScroll } from './js/render-functions.js';
import {showImage, perPage } from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import errorIcon from './img/bi_x-octagon.png';

document.addEventListener('submit', onFormSubmit);
document.querySelector('.loadBtn').addEventListener('click', onLoadMoreClick);

let searchQuery = '';
let page = 1;

function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}

async function onFormSubmit(e) {

  e.preventDefault();
  page = 1;
  searchQuery = e.target.elements.name.value;
    document.querySelector('.gallery').innerHTML = "";
  if (searchQuery.trim().length === 0) {
    iziToast.error({
      message: 'Please enter a valid search term!',
      position: 'topRight',
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      iconUrl: errorIcon,
      iconColor: '#ffffff',
    });
    return; 
  }

  showLoader();
    const data = await showImage(searchQuery, page)
        if (searchQuery.length > 0 && data.hits.length > 0) {
          renderImages(data.hits);
        } else {
          iziToast.error({
            message: 'Sorry, there are no images matching<br> your search query. Please try again!',
            position: 'topRight',
            messageColor: '#fafafb',
            backgroundColor: '#ef4040',
            iconUrl: errorIcon,
            iconColor: '#ffffff',
          });
        }
        checkBtnStatus(data);
        hideLoader();
  e.target.reset();
  }

async function onLoadMoreClick() {
  showLoader();
  page += 1;
  const data = await showImage(searchQuery, page)
  renderImages(data.hits);
  checkBtnStatus(data);
  hideLoader();
  smoothScroll();
}

function checkBtnStatus(data) {

  const maxPage = Math.ceil(data.totalHits / perPage);
  const isLastPage = maxPage <= perPage;
  if (isLastPage) {
    document.querySelector('.loadBtn').classList.add('hidden');
    iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
          });
  } else {
    document.querySelector('.loadBtn').classList.remove('hidden');
  }
}