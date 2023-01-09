import { getFormInputValues, resetFormAndClosePopup } from "./utils.js";
import { openPopup, closePopup, setPopupCloseListeners } from "./modal.js";
import { generateCardElement, renderCard, setCardListeners } from "./card.js";
import {
  popupEditProfile,
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
  popupAddCard,
  avatarContainer,
  initialCards,
} from "./constants.js";

import { formConfig as fc } from "./config.js";

import { setButtonState, enableValidation } from "./validate.js";

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
  resetFormAndClosePopup(evt);
};

const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();

  avatarImage.src = avatarInput.value;
  resetFormAndClosePopup(evt);
};

formEditProfile.addEventListener("submit", handleEditProfileSubmit);
formAddCard.addEventListener("submit", handleAddCardSubmit);
formEditAvatar.addEventListener("submit", handleEditAvatarSubmit);

// ============== popup events ======================================
btnOpenPopupEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

btnOpenPopupAddCard.addEventListener("click", () => {
  const submitButton = popupAddCard.querySelector(fc.submitButtonSelector);
  setButtonState(submitButton, false);
  openPopup(popupAddCard);
});

avatarContainer.addEventListener("click", () => {
  const submitButton = popupEditAvatar.querySelector(fc.submitButtonSelector);
  setButtonState(submitButton, false);
  openPopup(popupEditAvatar);
});

// ============== Render Initial cards =======================================
initialCards.forEach((data) =>
  renderCard(generateCardElement(data), cardsContainer)
);

setCardListeners();
setPopupCloseListeners();
enableValidation(fc);
