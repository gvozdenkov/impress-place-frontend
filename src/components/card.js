import {
  cardTemplate,
  cardPopupImage,
  cardPopupTitle,
  popupCard,
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardLikeSelector,
  cardLikeActiveClass,
  cardDeleteSelector,
} from "../utils/constants.js";

import { openPopup } from "./modal.js";

function generateCardElement(card) {
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);

  const cardImage = cardElement.querySelector(cardImageSelector);
  cardElement.querySelector(cardTitleSelector).textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `${card.name}.`;

  // card popup with image listener
  cardImage.addEventListener("click", (evt) => {
    const cardImage = evt.target;
    const cardElement = evt.target.closest(cardSelector);
    const cardTitle = cardElement.querySelector(cardTitleSelector);

    cardPopupImage.src = cardImage.src;
    cardPopupImage.alt = `${cardTitle.textContent}.`;
    cardPopupTitle.textContent = cardTitle.textContent;

    openPopup(popupCard);
  });

  // like listener
  const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
  cardLikeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle(cardLikeActiveClass);
  });

  // delete listener
  const cardDeleteBtn = cardElement.querySelector(cardDeleteSelector);
  cardDeleteBtn.addEventListener("click", (evt) => {
    evt.target.closest(cardSelector).remove();
  });

  return cardElement;
}

function renderCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

export { generateCardElement, renderCard };
