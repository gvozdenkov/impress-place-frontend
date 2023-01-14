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
import { deleteCard, getUserInfo, toggleLike } from "./api.js";

import { openPopup } from "./modal.js";

function isLiked(card) {
  return card.likes.some((like) => like._id === card.owner._id);
}

function generateCardElement(card) {
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);

  const cardImage = cardElement.querySelector(cardImageSelector);
  cardImage.src = card.link;
  cardImage.alt = `${card.name}.`;
  cardElement.querySelector(cardTitleSelector).textContent = card.name;

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

  // like button
  const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
  isLiked(card) ? cardLikeBtn.classList.add(cardLikeActiveClass) : null;

  cardLikeBtn.addEventListener("click", (evt) => {
    toggleLike(card._id, isLiked(card))
      .then((card) => {
        evt.target.classList.toggle(cardLikeActiveClass);
      })
      .catch((err) => {
        console.log(`Ошибка ${err.status} лайка карточки: ${err.statusText}`);
      });
  });

  // delete button
  const cardDeleteBtn = cardElement.querySelector(cardDeleteSelector);

  const handleDeleteCard = (evt) => {
    deleteCard(card._id).then((card) => {
      console.log(evt.target);
      evt.target.closest(cardSelector).remove();
    });
  };

  // check card owner === account owner to display delete button
  getUserInfo()
    .then((user) => {
      user._id === card.owner._id
        ? cardDeleteBtn.addEventListener("click", handleDeleteCard)
        : cardDeleteBtn.remove();
    })
    .catch((err) => {
      cardDeleteBtn.remove();
      console.log(
        `Ошибка ${err.status} загрузки данных пользователя: ${err.statusText}
        Кнопки удаления постов не активированы`
      );
    });

  return cardElement;
}

function renderCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

export { generateCardElement, renderCard };
