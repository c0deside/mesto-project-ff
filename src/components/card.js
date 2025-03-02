export function createCard(name, link, remove, like, openModal) {
  const template = document.querySelector('#card-template').content;
  const card = template.querySelector('.card').cloneNode(true);

  const image = card.querySelector('.card__image');
  image.src = link;
  image.alt = name;
  image.addEventListener('click', () => openModal(card));

  card.querySelector('.card__title').textContent = name;

  card.querySelector('.card__delete-button').addEventListener('click', () => remove(card));

  card.querySelector('.card__like-button').addEventListener('click', like);

  return card;
}

export function removeCard(card) {
  card.remove();
}

export function handleLikeClick(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
