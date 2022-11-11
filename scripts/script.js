const content = document.querySelector(".content");
const cardsContainer = content.querySelector(".photo-grid");
const cardTemplate = document.querySelector("#card-template").content;

// DOM elements
const btnOpenPopupEditProfile = content.querySelector(".profile__edit-btn");
const btnOpenPopupAddCard = content.querySelector(".profile__add-btn");
const profileName = content.querySelector(".profile__name");
const profileAbout = content.querySelector(".profile__about");

// popups
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupCard = document.querySelector(".popup_type_image");
const cardPopupImage = popupCard.querySelector(".popup__image");
const cardPopupTitle = popupCard.querySelector(".popup__image-title");

// forms
const formEditProfile = document.querySelector(".form_edit-profile");
const nameInput = formEditProfile.querySelector(".form__input_type_name");
const aboutInput = formEditProfile.querySelector(".form__input_type_about");
const formAddCard = document.querySelector(".form_add-card");

// ============== Popup functions =============================================
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const setPopupCloseListeners = (popup) => {
  const popupCloseButton = popup.querySelector(".popup__close-btn");
  popupCloseButton.addEventListener("click", () => closePopup(popup));

  popup.addEventListener("mousedown", (evt) => {
    const isPopupOutsideClick = Boolean(
      !evt.target.closest(".popup__container")
    );
    isPopupOutsideClick ? closePopup(popup) : null;
  });
};

const getFormInputValues = (form) => {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
};

const cleanFormInputs = (form) => {
  [...form.elements].forEach((input) => {
    input.nodeName === "INPUT" ? (input.value = "") : null;
  });
};

// //=============== Card functions ==========================================
const generateCardElement = (data) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__img").src = data.link;
  cardElement.querySelector(".card__img").alt = `${data.name}.`;
  cardElement.querySelector(".card__title").textContent = data.name;

  setCardListeners(cardElement);

  return cardElement;
};

const setCardListeners = (cardElement) => {
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");
  const cardImage = cardElement.querySelector(".card__img");

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-btn_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".card").remove();
  });

  cardImage.addEventListener("click", (evt) => {
    const cardImageElement = evt.target;
    const cardElement = evt.target.closest(".card");
    const cardTitle = cardElement.querySelector(".card__title");

    cardPopupImage.src = cardImageElement.src;
    cardPopupImage.alt = `${cardTitle.textContent}.`;
    cardPopupTitle.textContent = cardTitle.textContent;

    openPopup(popupCard);
  });
};

const renderCard = (cardElement, cardsContainer) => {
  cardsContainer.prepend(cardElement);
};

//=============== Form functions ==============================================
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
  cleanFormInputs(form);
  closePopup(popupAddCard);
};

// ============== form submit listeners =======================================
formEditProfile.addEventListener("submit", handleEditProfileSubmit);
formAddCard.addEventListener("submit", handleAddCardSubmit);

// ============== popup button listeners ======================================
btnOpenPopupEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

btnOpenPopupAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
});

// ==========================================================================
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => setPopupCloseListeners(popup));

// ============== Render Initial cards =======================================
initialCards.forEach((data) =>
  renderCard(generateCardElement(data), cardsContainer)
);
