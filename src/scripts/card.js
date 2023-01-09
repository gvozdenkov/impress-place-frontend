import {
  cardTemplate,
  cardsContainer,
  cardPopupImage,
  cardPopupTitle,
  popupCard,
} from "./constants.js";

import { openPopup } from "./modal.js";

const generateCardElement = (data) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__img").src = data.link;
  cardElement.querySelector(".card__img").alt = `${data.name}.`;
  cardElement.querySelector(".card__title").textContent = data.name;

  return cardElement;
};

const setCardListeners = () => {
  cardsContainer.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-btn")) {
      evt.target.classList.toggle("card__like-btn_active");
    }

    if (evt.target.classList.contains("card__delete-btn")) {
      evt.target.closest(".card").remove();
    }

    if (evt.target.classList.contains("card__img")) {
      const cardImageElement = evt.target;
      const cardElement = evt.target.closest(".card");
      const cardTitle = cardElement.querySelector(".card__title");

      cardPopupImage.src = cardImageElement.src;
      cardPopupImage.alt = `${cardTitle.textContent}.`;
      cardPopupTitle.textContent = cardTitle.textContent;

      openPopup(popupCard);
    }
  });
};

const renderCard = (cardElement, cardsContainer) => {
  cardsContainer.prepend(cardElement);
};

export { generateCardElement, setCardListeners, renderCard };
