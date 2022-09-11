// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
// Change code below this line

console.log(galleryItems);

// Описаний в документації
import simpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const newGalleryItem = createGalleryItems(galleryItems);

gallery.insertAdjacentHTML('beforeend', newGalleryItem);

// console.log(createGalleryItems(galleryItems));

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
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

gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const selectedImage = e.target.getAttribute('data-source');

  const instance = simpleLightbox.create(`
    <img src="${selectedImage}" width="800" height="600">
`);

  instance.show();
  gallery.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      instance.close();
    }
  });
});
