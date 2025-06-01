const template = document.querySelector('#card-template').content;

export function createCard(data, removable, remove, likeCard, openImageModal, imageModal, liked) {
  const { name, link, likes, _id } = data;
  const card = template.querySelector('.card').cloneNode(true);

  const image = card.querySelector('.card__image');
  image.src = link;
  image.alt = name;
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__like-counter').textContent = likes.length;

  card._id = _id;
  card.liked = liked;

  image.addEventListener('click', () => openImageModal(imageModal, link, name));

  const deleteButton = card.querySelector('.card__delete-button');
  if (removable) {
    deleteButton.addEventListener('click', () => remove(card));
  } else {
    deleteButton.style.visibility = 'hidden';
  }

  const likeButton = card.querySelector('.card__like-button');
  if (liked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => likeCard(card));

  return card;
}

export function removeCardElement(card) {
  card.remove();
}

export function checkCardLike(card, data) {
  const { likes, liked } = data;

  card.liked = liked;
  card.querySelector('.card__like-counter').textContent = likes.length;

  const likeButton = card.querySelector('.card__like-button');
  if (liked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
}
