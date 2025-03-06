export function createCard(name, link, remove, likeCard, openImageModal, imageModal) {
  const template = document.querySelector('#card-template').content;
  const card = template.querySelector('.card').cloneNode(true);

  const image = card.querySelector('.card__image');
  image.src = link;
  image.alt = name;
  card.querySelector('.card__title').textContent = name;

  card.querySelector('.card__delete-button').addEventListener('click', () => remove(card));
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  image.addEventListener('click', () => openImageModal(imageModal, link, name));

  return card;
}

export function removeCard(card) {
  card.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
