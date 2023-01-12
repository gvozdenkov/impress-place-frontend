import {
  cardTemplate,
  cardsContainer,
  cardPopupImage,
  cardPopupTitle,
  popupCard,
  cardSelector,
  cardImageSelector,
  cardTitleSelector,
  cardLikeClass,
  cardLikeActiveClass,
  cardDeleteClass,
  cardImageClass,
} from "../utils/constants.js";

import { openPopup } from "./modal.js";

function generateCardElement(card) {
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);

  const cardImage = cardElement.querySelector(cardImageSelector);
  cardImage.src = card.link;
  cardImage.alt = `${card.name}.`;
  cardElement.querySelector(cardTitleSelector).textContent = card.name;

  return cardElement;
}

function setCardListeners() {
  cardsContainer.addEventListener("click", (evt) => {
    const target = evt.target;
    const classList = target.classList;
    if (classList.contains(cardLikeClass)) {
      classList.toggle(cardLikeActiveClass);
    }

    if (classList.contains(cardDeleteClass)) {
      target.closest(cardSelector).remove();
    }

    if (classList.contains(cardImageClass)) {
      const cardImageElement = target;
      const cardElement = target.closest(cardSelector);
      const cardTitle = cardElement.querySelector(cardTitleSelector);

      cardPopupImage.src = cardImageElement.src;
      cardPopupImage.alt = `${cardTitle.textContent}.`;
      cardPopupTitle.textContent = cardTitle.textContent;

      openPopup(popupCard);
    }
  });
}

function renderCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

export { generateCardElement, setCardListeners, renderCard };
