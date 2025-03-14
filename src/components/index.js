import '../pages/index.css';
import { createCard, likeCard, removeCard } from './card';
import { initialCards } from './cards';
import { closeModal, openModal } from './modal';

// Popups

const editProfilePopup = document.querySelector('.popup_type_edit');
const addPlacePopup = document.querySelector('.popup_type_new-card');
const placePopup = document.querySelector('.popup_type_image');
const placePopupImage = placePopup.querySelector('.popup__image');
const placePopupCaption = placePopup.querySelector('.popup__caption');

// Profile Editing

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Profile Data

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

// Edit Profile Form

const editProfileForm = document.forms['edit-profile'];
const { name: profileNameInput, description: profileJobInput } = editProfileForm.elements;

// Add Place Form

const addPlaceForm = document.forms['new-place'];
const { 'place-name': placeNameInput, link: placeLinkInput } = addPlaceForm.elements;

// Places

const placesList = document.querySelector('.places__list');
const cards = initialCards.map(({ name, link }) => createCard(name, link, removeCard, likeCard, openImageModal, placePopup));

function openImageModal(popup, link, caption) {
  fulfillImagePopup(link, caption);
  openModal(popup);
}

function openEditProfileModal(popup, name, job) {
  fulfillEditProfilePopup(name, job);
  openModal(popup);
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

function addPlace(name, link) {
  const place = createCard(name, link, removeCard, likeCard, openImageModal, placePopup);
  placesList.prepend(place);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closeModal(editProfilePopup);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();

  addPlace(placeNameInput.value, placeLinkInput.value);

  closeModal(addPlacePopup);
  addPlaceForm.reset();
}

profileEditButton.addEventListener('click', () => openEditProfileModal(editProfilePopup, profileName.textContent, profileJob.textContent));
profileAddButton.addEventListener('click', () => openModal(addPlacePopup));
editProfileForm.addEventListener('submit', submitEditProfileForm);
addPlaceForm.addEventListener('submit', submitAddPlaceForm);

placesList.append(...cards);
