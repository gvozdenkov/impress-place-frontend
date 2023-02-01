export const content = document.querySelector('.content');
export const cardsContainer = content.querySelector('.photo-grid');
export const cardTemplate = document.querySelector('#card-template').content;
export const errorTemplate = document.querySelector(
  '#form-input-error-template',
).content;

// DOM elements
export const avatarContainer = content.querySelector('.profile__avatar');
export const profileAvatar = content.querySelector('.profile__avatar-img');
export const btnOpenPopupEditProfile =
  content.querySelector('.profile__edit-btn');
export const btnOpenPopupAddCard = content.querySelector('.profile__add-btn');
export const profileName = content.querySelector('.profile__name');
export const profileAbout = content.querySelector('.profile__about');

export const submitButtonSelector = '.form__submit';
export const formSelector = '.form';
export const submitButtonTextSelector = '.button__text';
export const ellipsisContainerSelector = '.ellipsis';
export const ellipsisClass = 'animated-ellipsis';

export const photoGridItemSelector = '.photo-grid__item';
export const cardSelector = '.card';
export const cardImageSelector = '.card__img';
export const cardTitleSelector = '.card__title';
export const cardLikeSelector = '.card__like-btn';
export const cardLikeCountSelector = '.card__like-count';
export const cardLikeActiveClass = 'card__like-btn_active';
export const cardLikeWithCountClass = 'card__like-btn_with-count';
export const cardDeleteSelector = '.card__delete-btn';

// popups
export const popupOpenedClass = 'popup_opened';
export const popupOpenedSelector = '.popup_opened';
export const popupCloseBtnClass = 'popup__close-btn';
export const popupEditAvatar = document.querySelector(
  '.popup_type_edit-avatar',
);
export const popupEditProfile = document.querySelector(
  '.popup_type_edit-profile',
);
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupCard = document.querySelector('.popup_type_image');
export const popupConfirmDelete = document.querySelector(
  '.popup_type_confirm-delete',
);
export const cardPopupImage = popupCard.querySelector('.popup__image');
export const cardPopupTitle = popupCard.querySelector('.popup__image-title');

// forms
export const formAddCard = document.querySelector('.add-card-form');
export const formEditProfile = document.querySelector('.edit-profile-form');
export const nameInput = document.querySelector('#name');
export const aboutInput = document.querySelector('#about');
export const formEditAvatar = document.querySelector('.edit-avatar-form');
export const avatarInput = document.querySelector('#avatar-link');
export const formConfirmDelete = document.querySelector('.confirm-delete-form');
