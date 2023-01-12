import "../pages/index.css";

import { getFormInputValues } from "../utils/utils.js";

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

import { formConfig as fc } from "../utils/config.js";

import {
  setButtonState,
  enableValidation,
  hideAllInputErrors,
} from "./validate.js";

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

  const form = evt.target;
  const data = getFormInputValues(form);
  const card = generateCardElement(data);

  renderCard(card, cardsContainer);
  form.reset();
  closePopup(form.closest(popupOpenedSelector));
};

const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();

  const form = evt.target;
  avatarImage.src = avatarInput.value;
  form.reset();
  closePopup(form.closest(popupOpenedSelector));
};

formEditProfile.addEventListener("submit", handleEditProfileSubmit);
formAddCard.addEventListener("submit", handleAddCardSubmit);
formEditAvatar.addEventListener("submit", handleEditAvatarSubmit);

// ============== popup events ======================================
btnOpenPopupEditProfile.addEventListener("click", () => {
  hideAllInputErrors(formEditProfile);
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

btnOpenPopupAddCard.addEventListener("click", () => {
  hideAllInputErrors(formAddCard);
  const submitButton = popupAddCard.querySelector(fc.submitButtonSelector);
  setButtonState(submitButton, false);
  openPopup(popupAddCard);
});

avatarContainer.addEventListener("click", () => {
  hideAllInputErrors(formEditAvatar);
  const submitButton = popupEditAvatar.querySelector(fc.submitButtonSelector);
  setButtonState(submitButton, false);
  openPopup(popupEditAvatar);
});

// ============== Render Initial cards =======================================
initialCards.forEach((data) =>
  renderCard(generateCardElement(data), cardsContainer)
);

enableValidation(fc);
