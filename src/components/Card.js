import {
  cardDeleteDisabledClass,
  cardDeleteSelector,
  cardImageSelector,
  cardLikeActiveClass,
  cardLikeCountSelector,
  cardLikeSelector,
  cardLikeWithCountClass,
  cardSelector,
  cardTitleSelector,
} from '../utils/constants.js';

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
    cardTemplateSelector,
    { name, link, owner, likes, _id, userId },
    { handleLike, handleDelete, handleImageClick },
  ) {
    this.#selector = cardTemplateSelector;
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
    return document
      .querySelector(this.#selector)
      .content.children[0].cloneNode(true);
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

    if (this.isLiked()) {
      this.#cardLikeBtn.classList.add(cardLikeActiveClass);
    }

    if (this.#owner._id !== this.#userId) {
      this.#cardDeleteBtn.classList.add(cardDeleteDisabledClass);
    }

    this.#setEventListeners();
    return this.#listElement;
  }

  getData() {
    return {
      name: this.#name,
      link: this.#link,
      owner: this.#owner,
      likes: this.#likes,
      id: this.#id,
    };
  }

  remove() {
    this.#listElement.remove();
  }

  #isHasLikes() {
    return this.#likes.length > 0;
  }

  isLiked() {
    return this.#likes.some((like) => like._id === this.#userId);
  }

  changeLike(card) {
    this.#likes = card.likes;

    if (this.#isHasLikes()) {
      this.#cardLikeCount.textContent = this.#likes.length;
      this.#cardLikeBtn.classList.add(cardLikeWithCountClass);
    } else {
      this.#cardLikeCount.textContent = '';
      this.#cardLikeBtn.classList.remove(cardLikeWithCountClass);
    }

    if (this.isLiked()) {
      this.#cardLikeBtn.classList.add(cardLikeActiveClass);
    } else {
      this.#cardLikeBtn.classList.remove(cardLikeActiveClass);
    }
  }

  #setEventListeners() {
    this.#cardImage.addEventListener('click', () => {
      this.#handleImageClick(this);
    });

    this.#cardLikeBtn.addEventListener('click', () => {
      this.#handleLike(this);
    });

    this.#cardDeleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleDelete(this);
    });
  }
}
