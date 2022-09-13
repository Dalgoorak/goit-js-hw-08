import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', onFormSubmit);
textarea.addEventListener('input', throttle(onTextareaInput, 500));

const formData = {};

form.addEventListener('input', e => {
  formData[e.target.name] = e.target.value;
  console.log(formData);
});

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  const message = e.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    textarea.value = savedMessage;
  }
}
