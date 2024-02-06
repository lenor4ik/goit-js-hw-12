import './css/styles.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import errorIcon from './img/bi_x-octagon.png';
import axios from 'axios';


document.addEventListener('submit', onFormSubmit);

function showImage(searchName) {
    const BASE_URL = 'https://pixabay.com/api/';
    const END_POINT = '?';
    const PARAMS = new URLSearchParams({
    key:'42187332-ff85343869753156c1a8d7a61',
    q: `${searchName}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    })
    const url = BASE_URL+END_POINT+PARAMS;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
      throw new Error('Error fetching images from the server');
    });
}

const lightboxConfig = {
  captionsTitle: 'attr',
  captionsData: "alt",
}
const lightbox = new SimpleLightbox('.gallery a', lightboxConfig);

function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  document.querySelector('.gallery').innerHTML = "";
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}

function onFormSubmit(e) {
  e.preventDefault();
  const searchName = e.target.elements.name.value;

  if (searchName.trim().length === 0) {
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

    showImage(searchName)
      .then(data => {
        if (searchName.length > 0 && data.hits.length > 0) {
          renderImages(data.hits);
          lightbox.refresh();
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
      })
      .finally(() => {
        hideLoader();
        e.target.reset();
      });
  }

function imageTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}" 
      alt="${tags}"
    >
        <div class="all-image-info">
    <p class="image-info"><span class="property-name">Likes</span>${likes}</p>
        <p class="image-info"><span class="property-name">Views</span>${views}</p>
            <p class="image-info"><span class="property-name">Comments</span>${comments}</p>
                <p class="image-info"><span class="property-name">Downloads</span>${downloads}</p>
                </div>
    </a>
  </li>`;
}

function imagesTemplate(images) {
return images.map(imageTemplate).join('');
}

function renderImages(images) {
  const markup = imagesTemplate(images);
  document.querySelector('.gallery').innerHTML = markup;
}

