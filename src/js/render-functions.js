import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightboxConfig = {
  captionsTitle: 'attr',
  captionsData: "alt",
}

const lightbox = new SimpleLightbox('.gallery a', lightboxConfig);

export function imageTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
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

export function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}

export function renderImages(images) {
  const markup = imagesTemplate(images);
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
    
}

export function smoothScroll(page) {
  if (page === 1) {
      return;
  }
  const galleryChildsList = document.querySelectorAll('.gallery-item');
  const { height: cardHeight } = galleryChildsList[galleryChildsList.length - 1].getBoundingClientRect();
  
  window.scrollBy({
      top: cardHeight * 2,//лучше 3.5
      behavior: "smooth",
  });
}