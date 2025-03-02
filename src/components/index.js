import '../pages/index.css';
import { createCard, handleLikeClick, removeCard } from './card';
import { initialCards } from './cards';
import { closeModal, handleModalEvents, openModal } from './modal';

const pageContent = document.querySelector('.page__content');

// Popups

const editProfilePopup = document.querySelector('.popup_type_edit');
const addPlacePopup = document.querySelector('.popup_type_new-card');
const placePopup = document.querySelector('.popup_type_image');
const placePopupImage = placePopup.querySelector('.popup__image');
const placePopupCaption = placePopup.querySelector('.popup__caption');

// Profile data

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Edit profile form

const editProfileForm = document.forms['edit-profile'];
const { name: profileNameInput, description: profileJobInput } = editProfileForm.elements;

// Add place form

const addPlaceForm = document.forms['new-place'];
const { 'place-name': placeNameInput, link: placeLinkInput } = addPlaceForm.elements;

// Places list

const placesList = document.querySelector('.places__list');

function openEditProfilePopup() {
  fulfillEditProfileForm();
  editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
  openModal(editProfilePopup);
}

function openAddPlacePopup() {
  addPlaceForm.addEventListener('submit', handleAddPlaceFormSubmit);
  openModal(addPlacePopup);
}

function openPlaceImagePopup(card) {
  fulfillPlaceImagePopup(card);
  openModal(placePopup);
}

function fulfillPlaceImagePopup(card) {
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  placePopupImage.src = cardImage.src;
  placePopupImage.alt = cardImage.alt;
  placePopupCaption.textContent = cardTitle.textContent;
}

function fulfillEditProfileForm() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
}

function addPlace(name, link) {
  const place = createCard(name, link, removeCard, handleLikeClick, openPlaceImagePopup);
  placesList.prepend(place);
}

function resetAddPlaceForm() {
  addPlaceForm.reset();
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closeModal(editProfilePopup);

  evt.target.removeEventListener('submit', handleEditProfileFormSubmit);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();

  addPlace(placeNameInput.value, placeLinkInput.value);

  closeModal(addPlacePopup);
  resetAddPlaceForm();

  evt.target.removeEventListener('submit', handleAddPlaceFormSubmit);
}

pageContent.addEventListener('click', evt => handleModalEvents(evt, openEditProfilePopup, openAddPlacePopup));

placesList.append(...initialCards.map(card => createCard(card.name, card.link, removeCard, handleLikeClick, openPlaceImagePopup)));
