import Throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('[name="email"]');
const message = form.querySelector('[name="message"]');

const localKey = 'feedback-form-state';

form.addEventListener('input', Throttle(storageFormData, 500));
form.addEventListener('submit', onFormSubmit);
window.addEventListener('load', checkStorage);

function checkStorage() {
  if (!localStorage.getItem(localKey)) return;
  const onFormValue = JSON.parse(localStorage.getItem(localKey));
  for (const key in onFormValue) {
    form.elements[key].value = onFormValue[key];
  }

  // email.value = onFormValue.email;
  // message.value = onFormValue.message;
}

function onFormSubmit(event) {
  event.preventDefault();
  // 1 метод
  //   const { email, message } = event.currentTarget.elements;
  // 2 метод
  const saveData = JSON.parse(localStorage.getItem(localKey));

  console.dir(saveData);

  localStorage.removeItem(localKey);
  event.currentTarget.reset();
}

function storageFormData(event) {
  const formValue = { email: '', message: '' };
  if (localStorage.getItem(localKey)) {
    Object.assign(formValue, JSON.parse(localStorage.getItem(localKey)));
  }

  formValue[event.target.name] = event.target.value;

  localStorage.setItem(localKey, JSON.stringify(formValue));
}
