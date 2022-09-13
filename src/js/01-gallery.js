// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
console.log(galleryItems);
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const newGalleryItem = createGalleryItems(galleryItems);

// console.log(createGalleryItems(galleryItems));

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

gallery.insertAdjacentHTML('beforeend', newGalleryItem);

let newGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

console.log(newGallery);
