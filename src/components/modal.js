export function openImageModal(popup, link, caption) {
  fulfillImagePopup(popup, link, caption);
  openModal(popup);
}

export function openEditProfileModal(popup, name, job) {
  fulfillEditProfilePopup(popup, name, job);
  openModal(popup);
}

export function openModal(popup) {
  toggleModalVisibility(popup);
  popup.addEventListener('click', closeModalOnClick);
  document.addEventListener('keydown', closeModalOnEscape);
}

export function closeModal(popup) {
  toggleModalVisibility(popup);
  popup.removeEventListener('click', closeModalOnClick);
  document.removeEventListener('keydown', closeModalOnEscape);
}

function fulfillImagePopup(popup, link, caption) {
  const image = popup.querySelector('.popup__image');
  image.src = link;
  image.alt = caption;
  popup.querySelector('.popup__caption').textContent = caption;
}

function fulfillEditProfilePopup(popup, name, job) {
  const form = popup.querySelector('.popup__form');
  const { name: nameInput, description: jobInput } = form.elements;
  nameInput.value = name;
  jobInput.value = job;
}

function toggleModalVisibility(popup) {
  popup.classList.toggle('popup_is-opened');
  popup.classList.toggle('popup_is-animated');
}

function closeModalOnClick(evt) {
  const { classList } = evt.target;

  if (classList.contains('popup__close')) {
    return closeModal(evt.target.closest('.popup'));
  }

  if (classList.contains('popup')) {
    return closeModal(evt.target);
  }
}

function closeModalOnEscape(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  const popup = document.querySelector('.popup_is-opened');
  closeModal(popup);
}
