import '../pages/index.css';
import * as api from './api';
import { checkCardLike, createCard, removeCardElement } from './card';
import { closeModal, openModal } from './modal';
import { clearValidation, enableValidation, showInputError } from './validation';

// Forms Selectors

const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__button';

// Errors Classes

const inactiveButtonClass = 'popup__button_inactive';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__input-error_active';

// Popups

const editProfilePopup = document.querySelector('.popup_type_edit');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const addPlacePopup = document.querySelector('.popup_type_new-card');
const placePopup = document.querySelector('.popup_type_image');
const deleteConfirmationPopup = document.querySelector('.popup_type_delete-confirmation');
const placePopupImage = placePopup.querySelector('.popup__image');
const placePopupCaption = placePopup.querySelector('.popup__caption');

// Profile Editing

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Profile Data

let user = {};
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Edit Profile Form

const editProfileForm = document.forms['edit-profile'];
const { name: profileNameInput, description: profileJobInput } = editProfileForm.elements;
const editProfileSubmitButton = editProfileForm.querySelector(submitButtonSelector);

// Edit Avatar Form

const editAvatarForm = document.forms['edit-avatar'];
const { avatar: avatarLinkInput } = editAvatarForm.elements;
const editAvatarSubmitButton = editAvatarForm.querySelector(submitButtonSelector);

// Add Place Form

const addPlaceForm = document.forms['new-place'];
const { 'place-name': placeNameInput, link: placeLinkInput } = addPlaceForm.elements;
const addPlaceSubmitButton = addPlaceForm.querySelector(submitButtonSelector);

// Delete Place Form

const deleteConfirmationForm = document.forms['delete-confirmation'];
const deleteConfirmationButton = deleteConfirmationForm.querySelector(submitButtonSelector);
let deletingCard;

// Places

const placesList = document.querySelector('.places__list');

// Validation

const validationConfig = { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass };
const validationClearingConfig = { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass };

function openImageModal(popup, link, caption) {
  fulfillImagePopup(link, caption);
  openModal(popup);
}

function openEditProfileModal(popup, name, job) {
  clearValidation(editProfileForm, validationClearingConfig);
  fulfillEditProfilePopup(name, job);
  openModal(popup);
}

function openEditAvatarModal(popup, link) {
  clearValidation(editAvatarForm, validationClearingConfig);
  fulfillEditAvatarPopup(link);
  openModal(popup);
}

function openAddPlaceModal(popup) {
  clearValidation(addPlaceForm, validationClearingConfig);
  addPlaceForm.reset();
  openModal(popup);
}

function openDeleteConfirmationModal(card) {
  deletingCard = card;
  openModal(deleteConfirmationPopup);
}

function fulfillImagePopup(link, caption) {
  placePopupImage.src = link;
  placePopupImage.alt = caption;
  placePopupCaption.textContent = caption;
}

function fulfillEditProfilePopup(name, job) {
  profileNameInput.value = name;
  profileJobInput.value = job;
}

function fulfillEditAvatarPopup(link) {
  avatarLinkInput.value = link;
}

function getAvatarUrl(avatarElement) {
  return avatarElement.style.backgroundImage.slice(5, -2);
}

async function submitEditProfileForm(evt) {
  evt.preventDefault();
  setSubmitButtonLoadingState(editProfileSubmitButton);

  const user = await api.patchUser({ name: profileNameInput.value, about: profileJobInput.value });
  if (user) {
    fulfillProfile(user);
  }

  setSubmitButtonDefaultState(editProfileSubmitButton);
  closeModal(editProfilePopup);
}

async function submitEditAvatarForm(evt) {
  evt.preventDefault();
  setSubmitButtonLoadingState(editAvatarSubmitButton);

  const valid = await api.validateImageLink(avatarLinkInput.value);
  if (!valid) {
    avatarLinkInput.setCustomValidity('Некорректная ссылка на изображение');
    showInputError(editAvatarForm, avatarLinkInput, inputErrorClass, errorClass);
    setSubmitButtonDefaultState(editAvatarSubmitButton);
    return;
  }

  avatarLinkInput.setCustomValidity('');
  const user = await api.changeUserAvatar({ avatar: avatarLinkInput.value });
  if (user) {
    profileImage.style.backgroundImage = `url(${user.avatar})`;
  }

  closeModal(editAvatarPopup);
  setSubmitButtonDefaultState(editAvatarSubmitButton);
}

async function submitAddPlaceForm(evt) {
  evt.preventDefault();
  setSubmitButtonLoadingState(addPlaceSubmitButton);

  const card = await api.saveCard({ name: placeNameInput.value, link: placeLinkInput.value });
  if (card) {
    addPlace(card);
  }

  closeModal(addPlacePopup);
  setSubmitButtonDefaultState(addPlaceSubmitButton);
  addPlaceForm.reset();
}

async function submitDeletePlaceForm(evt) {
  evt.preventDefault();
  setSubmitButtonLoadingState(deleteConfirmationButton, 'Удаление…');

  const result = await api.deleteCard(deletingCard._id);
  if (result) {
    removeCardElement(deletingCard);
  }

  closeModal(deleteConfirmationPopup);
  setSubmitButtonDefaultState(deleteConfirmationButton, 'Да');
}

function setSubmitButtonLoadingState(button, text = 'Сохранение…') {
  button.textContent = text;
}

function setSubmitButtonDefaultState(button, text = 'Сохранить') {
  button.textContent = text;
}

async function toggleCardLike(card) {
  const toggleLike = card.liked ? api.deleteCardLike : api.saveCardLike;

  const updated = await toggleLike(card._id);
  if (updated) {
    checkCardLike(card, { ...updated, liked: !card.liked });
  }
}

function fulfillProfile(data) {
  user = data;
  const { name, about, avatar } = data;
  profileName.textContent = name;
  profileJob.textContent = about;
  profileImage.style.backgroundImage = `url(${avatar})`;
}

function addPlace(card) {
  const place = createCard(card, true, openDeleteConfirmationModal, toggleCardLike, openImageModal, placePopup, false);
  placesList.prepend(place);
}

function fulfillCards(initialCards, userId) {
  const cards = initialCards.map(card =>
    createCard(
      card,
      card.owner._id === userId,
      openDeleteConfirmationModal,
      toggleCardLike,
      openImageModal,
      placePopup,
      card.likes.map(({ _id }) => _id).includes(userId),
    ),
  );
  placesList.append(...cards);
}

profileEditButton.addEventListener('click', () => openEditProfileModal(editProfilePopup, profileName.textContent, profileJob.textContent));
profileAddButton.addEventListener('click', () => openAddPlaceModal(addPlacePopup));
profileImage.addEventListener('click', () => openEditAvatarModal(editAvatarPopup, getAvatarUrl(profileImage)));

editProfileForm.addEventListener('submit', submitEditProfileForm);
addPlaceForm.addEventListener('submit', submitAddPlaceForm);
editAvatarForm.addEventListener('submit', submitEditAvatarForm);
deleteConfirmationForm.addEventListener('submit', submitDeletePlaceForm);

enableValidation(validationConfig);

const [initialUser, initialCards] = await Promise.all([api.getUser(), api.getInitialCards()]);
fulfillProfile(initialUser);
fulfillCards(initialCards, user._id);
