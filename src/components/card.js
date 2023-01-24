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
  cardLikeWithCountClass,
  cardLikeCountSelector,
  popupConfirmDelete,
  photoGridItemSelector,
  submitButtonSelector,
} from '../utils/constants.js';
import {
  hideButtonLoadingEllipsis,
  showButtonLoadingEllipsis,
} from '../utils/utils.js';

import { deleteCard } from './api.js';
import { userId } from './index.js';

import { closeAllPopups, openPopup } from './modal.js';

function isLiked(card) {
  const cardElement = document.querySelector(`[data-card-id="${card._id}"]`);
  const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
  const liked = cardLikeBtn.classList.contains(cardLikeActiveClass);

  return liked;
}

function isHasLikes(card) {
  return card.likes.length > 0;
}

function changeLike(card) {
  const cardElement = document.querySelector(`[data-card-id="${card._id}"]`);
  const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
  const cardLikeCount = cardElement.querySelector(cardLikeCountSelector);

  if (isHasLikes(card)) {
    cardLikeCount.textContent = card.likes.length;
    cardLikeBtn.classList.add(cardLikeWithCountClass);
  } else {
    cardLikeCount.textContent = '';
    cardLikeBtn.classList.remove(cardLikeWithCountClass);
  }

  if (isLiked(card)) {
    cardLikeBtn.classList.remove(cardLikeActiveClass);
  } else {
    cardLikeBtn.classList.add(cardLikeActiveClass);
  }
}

function createCardElement(card, userId, handleLikeCard) {
  const listElement = cardTemplate
    .querySelector(photoGridItemSelector)
    .cloneNode(true);

  listElement.setAttribute('data-card-id', card._id);

  const cardElement = listElement.querySelector(cardSelector);

  const cardImage = cardElement.querySelector(cardImageSelector);
  cardImage.src = card.link;
  cardImage.alt = `${card.name}.`;
  cardElement.querySelector(cardTitleSelector).textContent = card.name;

  // card popup with image listener
  function handleCardImageClick({ link, name }) {
    cardPopupImage.src = link;
    cardPopupImage.alt = `${name}.`;
    cardPopupTitle.textContent = name;
  }

  cardImage.addEventListener('click', () => {
    handleCardImageClick(card);
    openPopup(popupCard);
  });

  // like button
  const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
  const cardLikeCount = cardElement.querySelector(cardLikeCountSelector);
  const cardDeleteBtn = cardElement.querySelector(cardDeleteSelector);

  if (isHasLikes(card)) {
    cardLikeCount.textContent = card.likes.length;
    cardLikeBtn.classList.add(cardLikeWithCountClass);
  } else {
    cardLikeCount.textContent = '';
  }

  card.likes.some((like) => like._id === userId)
    ? cardLikeBtn.classList.add(cardLikeActiveClass)
    : null;

  cardLikeBtn.addEventListener('click', () => {
    handleLikeCard(card, isLiked(card));
  });

  // delete button
  function handleConfirmDeleteSubmit(popup) {
    const submitButton = popup.querySelector(submitButtonSelector);
    const deletedCardElement = document.querySelector(
      `[data-card-id="${card._id}"]`
    );

    showButtonLoadingEllipsis(submitButton, 'Удаление');

    deleteCard(card._id)
      .then(() => {
        deletedCardElement.remove();
        closeAllPopups(popup);
      })
      .catch((err) => {
        console.log(
          `Ошибка ${err.status} удаления карточки: ${err.statusText}`
        );
      })
      .finally(() => {
        hideButtonLoadingEllipsis(submitButton, 'Да');
      });
  }

  // check card owner === account owner to display delete button
  const handleCardDeleteBtnClick = (evt) => {
    openPopup(popupConfirmDelete).then((cardDelete) => {
      cardDelete ? handleConfirmDeleteSubmit(popupConfirmDelete) : null;
    });
  };

  card.owner._id === userId
    ? cardDeleteBtn.addEventListener('click', handleCardDeleteBtnClick)
    : cardDeleteBtn.remove();

  return listElement;
}

function renderCard(cardElement, cardsContainer) {
  cardsContainer.prepend(cardElement);
}

export { createCardElement, renderCard, changeLike };
