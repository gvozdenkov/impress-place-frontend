export const initialCards = [
  {
    name: "Алтайский край",
    link: "https://images.unsplash.com/photo-1590933582783-be57939a1e7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80",
  },
  {
    name: "Рыбалка на Волге",
    link: "https://images.unsplash.com/photo-1623490823615-9d403523b019?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Крыши Питера",
    link: "https://images.unsplash.com/photo-1633211249429-1538a4b7ba9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
  },
  {
    name: "Камчатка",
    link: "https://images.unsplash.com/photo-1584315565803-fe062aff262d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80",
  },
  {
    name: "Сочи",
    link: "https://images.unsplash.com/photo-1515578706925-0dc1a7bfc8cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
  },
  {
    name: "Байкал",
    link: "https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
  },
];

export const content = document.querySelector(".content");
export const cardsContainer = content.querySelector(".photo-grid");
export const cardTemplate = document.querySelector("#card-template").content;

// DOM elements
export const avatarContainer = content.querySelector(".profile__avatar");
export const avatarImage = content.querySelector(".profile__avatar-img");
export const btnOpenPopupEditProfile =
  content.querySelector(".profile__edit-btn");
export const btnOpenPopupAddCard = content.querySelector(".profile__add-btn");
export const profileName = content.querySelector(".profile__name");
export const profileAbout = content.querySelector(".profile__about");

export const cardSelector = ".card";
export const cardImageSelector = ".card__img";
export const cardImageClass = "card__img";
export const cardTitleSelector = ".card__title";
export const cardLikeSelector = ".card__like-btn";
export const cardLikeActiveClass = "card__like-btn_active";
export const cardDeleteSelector = ".card__delete-btn";

// popups
export const popupOpenedClass = "popup_opened";
export const popupOpenedSelector = ".popup_opened";
export const popupCloseBtnClass = "popup__close-btn";
export const popupEditAvatar = document.querySelector(
  ".popup_type_edit-avatar"
);
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupCard = document.querySelector(".popup_type_image");
export const cardPopupImage = popupCard.querySelector(".popup__image");
export const cardPopupTitle = popupCard.querySelector(".popup__image-title");

// forms
export const formAddCard = document.querySelector(".add-card-form");
export const formEditProfile = document.querySelector(".edit-profile-form");
export const nameInput = document.querySelector("#name");
export const aboutInput = document.querySelector("#about");
export const formEditAvatar = document.querySelector(".edit-avatar-form");
export const avatarInput = document.querySelector("#avatar-link");
