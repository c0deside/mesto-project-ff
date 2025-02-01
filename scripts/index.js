function createCard(name, link, removeCard) {
  const cardTemplate = document.querySelector('#card-template').content;

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => removeCard(deleteButton));

  return card;
}

function removeCard(button) {
  button.closest('.card').remove();
}

const placesListElement = document.querySelector('.places__list');
placesListElement.append(...initialCards.map(card => createCard(card.name, card.link, removeCard)));
