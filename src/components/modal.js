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

function toggleModalVisibility(popup) {
  popup.classList.toggle('popup_is-opened');
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
