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
  photoGridItemSelector,
  popupOpenedClass,
  cardDeleteDisabledClass,
} from '../utils/constants.js';

import { openPopup } from './modal.js';

export class Card {
  #selector;
  #name;
  #link;
  #owner;
  #likes;
  #id;
  #userId;

  #handleLike;
  #handleDelete;
  #handleImageClick;

  #listElement;
  #cardElement;
  #cardImage;
  #cardTitle;
  #cardLikeBtn;
  #cardLikeCount;
  #cardDeleteBtn;

  constructor(
    selector,
    { name, link, owner, likes, _id },
    userId,
    handleLike,
    handleDelete,
    handleImageClick,
  ) {
    this.#selector = selector;
    this.#name = name;
    this.#link = link;
    this.#owner = owner;
    this.#likes = likes;
    this.#id = _id;
    this.#userId = userId;

    this.#handleLike = handleLike;
    this.#handleDelete = handleDelete;
    this.#handleImageClick = handleImageClick;

    this.#listElement = this.#getElement();

    this.#cardElement = this.#listElement.querySelector(cardSelector);
    this.#cardImage = this.#cardElement.querySelector(cardImageSelector);
    this.#cardTitle = this.#cardElement.querySelector(cardTitleSelector);
    this.#cardDeleteBtn = this.#cardElement.querySelector(cardDeleteSelector);
    this.#cardLikeBtn = this.#cardElement.querySelector(cardLikeSelector);
    this.#cardLikeCount = this.#cardElement.querySelector(
      cardLikeCountSelector,
    );
  }

  #getElement() {
    const cardElement = document
      .querySelector(this.#selector)
      .content.querySelector(photoGridItemSelector)
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = `${this.#name}.`;
    this.#cardTitle.textContent = this.#name;

    if (this.#isHasLikes()) {
      this.#cardLikeCount.textContent = this.#likes.length;
      this.#cardLikeBtn.classList.add(cardLikeWithCountClass);
    } else {
      this.#cardLikeCount.textContent = '';
    }

    if (this.#isLiked()) {
      this.#cardLikeBtn.classList.add(cardLikeActiveClass);
    }

    if (this.#owner._id !== this.#userId) {
      this.#cardDeleteBtn.classList.add(cardDeleteDisabledClass);
    }

    this.#setEventListeners();
    return this.#listElement;
  }

  getCardData() {
    return {
      name: this.#name,
      link: this.#link,
      owner: this.#owner,
      likes: this.#likes,
      id: this.#id,
    };
  }

  #isHasLikes() {
    return this.#likes.length > 0;
  }

  #isLiked() {
    return this.#likes.some((like) => like._id === this.#userId);
  }

  #setEventListeners() {
    this.#cardImage.addEventListener('click', () => {
      this.#handleImageClick(this);
    });

    this.#cardLikeBtn.addEventListener('click', () => {
      this.#handleLike(this);
    });

    this.#cardDeleteBtn.addEventListener('click', () => {
      this.#handleDelete(this);
    });
  }
}

// function isLiked(card) {
//   const cardElement = document.querySelector(`[data-card-id="${card._id}"]`);
//   const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
//   const liked = cardLikeBtn.classList.contains(cardLikeActiveClass);

//   return liked;
// }

// function isHasLikes(card) {
//   return card.likes.length > 0;
// }

// function changeLike(card) {
//   const cardElement = document.querySelector(`[data-card-id="${card._id}"]`);
//   const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
//   const cardLikeCount = cardElement.querySelector(cardLikeCountSelector);

//   if (isHasLikes(card)) {
//     cardLikeCount.textContent = card.likes.length;
//     cardLikeBtn.classList.add(cardLikeWithCountClass);
//   } else {
//     cardLikeCount.textContent = '';
//     cardLikeBtn.classList.remove(cardLikeWithCountClass);
//   }

//   if (isLiked(card)) {
//     cardLikeBtn.classList.remove(cardLikeActiveClass);
//   } else {
//     cardLikeBtn.classList.add(cardLikeActiveClass);
//   }
// }

// function createCardElement(card, userId, handleLikeCard, handleDeleteCard) {
// const listElement = cardTemplate
//   .querySelector(photoGridItemSelector)
//   .cloneNode(true);

//   listElement.setAttribute('data-card-id', card._id);

//   const cardElement = listElement.querySelector(cardSelector);

//   const cardImage = cardElement.querySelector(cardImageSelector);
//   cardImage.src = card.link;
//   cardImage.alt = `${card.name}.`;
//   cardElement.querySelector(cardTitleSelector).textContent = card.name;

// // card popup with image listener
// function handleCardImageClick({ link, name }) {
//   cardPopupImage.src = link;
//   cardPopupImage.alt = `${name}.`;
//   cardPopupTitle.textContent = name;
// }

// cardImage.addEventListener('click', () => {
//   handleCardImageClick(card);
//   openPopup(popupCard);
// });

//   // like button
//   const cardLikeBtn = cardElement.querySelector(cardLikeSelector);
//   const cardLikeCount = cardElement.querySelector(cardLikeCountSelector);
//   const cardDeleteBtn = cardElement.querySelector(cardDeleteSelector);

// if (isHasLikes(card)) {
//   cardLikeCount.textContent = card.likes.length;
//   cardLikeBtn.classList.add(cardLikeWithCountClass);
// } else {
//   cardLikeCount.textContent = '';
// }

// card.likes.some((like) => like._id === userId)
//   ? cardLikeBtn.classList.add(cardLikeActiveClass)
//   : null;

//   cardLikeBtn.addEventListener('click', () => {
//     handleLikeCard(card, isLiked(card));
//   });

//   // delete button
// card.owner._id === userId
//   ? cardDeleteBtn.addEventListener('click', () => handleDeleteCard(card))
//   : cardDeleteBtn.remove();

//   return listElement;
// }

// function removeCard(card) {
//   const deletedCardElement = document.querySelector(
//     `[data-card-id="${card._id}"]`,
//   );
//   deletedCardElement.remove();
// }

// function renderCard(cardElement, cardsContainer) {
//   cardsContainer.prepend(cardElement);
// }

// export { createCardElement, renderCard, removeCard, changeLike };
