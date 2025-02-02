const placesListElement = document.querySelector('.places__list');

function createCard(name, link, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;

  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  card.querySelector('.card__title').textContent = name;

  card.querySelector('.card__delete-button').addEventListener('click', () => removeCard(card));

  return card;
}

function removeCard(card) {
  card.remove();
}

placesListElement.append(...initialCards.map(card => createCard(card.name, card.link, removeCard)));
