export function handleModalEvents(evt, openEditProfilePopup, openAddPlacePopup) {
  const { classList } = evt.target;

  if (classList.contains('profile__edit-button')) {
    return openEditProfilePopup();
  }

  if (classList.contains('profile__add-button')) {
    return openAddPlacePopup();
  }

  if (classList.contains('popup__close')) {
    return closeModal(evt.target.parentElement.parentElement);
  }

  if (classList.contains('popup')) {
    return closeModal(evt.target);
  }
}

export function openModal(popup) {
  toggleModalVisibility(popup);
  document.addEventListener('keydown', closeModalOnEscape);
}

export function closeModal(popup) {
  toggleModalVisibility(popup);
  document.removeEventListener('keydown', closeModalOnEscape);
}

function toggleModalVisibility(popup) {
  popup.classList.toggle('popup_is-opened');
  popup.classList.toggle('popup_is-animated');
}

function closeModalOnEscape(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  const popup = document.querySelector('.popup_is-opened');
  closeModal(popup);
}
