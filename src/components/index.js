import "../pages/index.css";

import {
  getFormInputValues,
  hideAllInputErrors,
  setButtonState,
  getPopupElement,
} from "../utils/utils.js";

import { openPopup, closePopup } from "./modal.js";

import { generateCardElement, renderCard } from "./card.js";

import {
  popupEditProfile,
  popupEditAvatar,
  popupAddCard,
  popupOpenedSelector,
  profileName,
  profileAbout,
  avatarImage,
  cardsContainer,
  avatarInput,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  btnOpenPopupEditProfile,
  nameInput,
  aboutInput,
  btnOpenPopupAddCard,
  avatarContainer,
  initialCards,
} from "../utils/constants.js";

import { validationConfig } from "../utils/config.js";

import { enableValidation, isFormValid } from "./validate.js";

//=============== Form events =====================================

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const { name, about } = getFormInputValues(form);

  profileName.textContent = name;
  profileAbout.textContent = about;

  closePopup(popupEditProfile);
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const data = getFormInputValues(formAddCard);
  const card = generateCardElement(data);

  renderCard(card, cardsContainer);
  formAddCard.reset();
  closePopup(popupAddCard);
};

const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();

  avatarImage.src = avatarInput.value;
  formEditAvatar.reset();
  closePopup(popupEditAvatar);
};

formEditProfile.addEventListener("submit", handleEditProfileSubmit);
formAddCard.addEventListener("submit", handleAddCardSubmit);
formEditAvatar.addEventListener("submit", handleEditAvatarSubmit);

// ============== popup events ======================================
const handleOpenPopupWithForm = (evt) => {
  const popup = getPopupElement(evt.target);
  const form = popup.querySelector(validationConfig.formSelector);
  const submitButton = popup.querySelector(
    validationConfig.submitButtonSelector
  );

  hideAllInputErrors(form);
  openPopup(popup);
  setButtonState(submitButton, isFormValid(form));
};

btnOpenPopupEditProfile.addEventListener("click", (evt) => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  handleOpenPopupWithForm(evt);
});

btnOpenPopupAddCard.addEventListener("click", handleOpenPopupWithForm);

avatarContainer.addEventListener("click", handleOpenPopupWithForm);

// ============== Render Initial cards =======================================
initialCards.forEach((data) =>
  renderCard(generateCardElement(data), cardsContainer)
);

enableValidation(validationConfig);
