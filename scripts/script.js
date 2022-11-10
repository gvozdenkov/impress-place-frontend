const content = document.querySelector(".content");
const cardsContainer = content.querySelector(".photo-grid");

// DOM elements
const editProfileButton = content.querySelector(".profile__edit-btn");
const addCardButton = content.querySelector(".profile__add-btn");
const profileName = content.querySelector(".profile__name");
const profileAbout = content.querySelector(".profile__about");

// popups
const editProfilePopup = document.querySelector(".popup_edit-profile");
const addCardPopup = document.querySelector(".popup_add-card");
const cardPopup = document.querySelector(".popup_type_image");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupTitle = cardPopup.querySelector(".popup__image-title");

// forms
const editProfileForm = document.querySelector(".form_edit-profile");
const addCardForm = document.querySelector(".form_add-card");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__title").textContent = data.name;
  cardElement.querySelector(".card__img").src = data.link;

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

    setPopupCloseListeners(cardPopup);
    openPopup(cardPopup);
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

  closePopup(form.closest(".popup"));
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const form = evt.target;
  const data = getFormInputValues(form);
  const card = generateCardElement(data);

  renderCard(card, cardsContainer);
  cleanFormInputs(form);
  closePopup(form.closest(".popup"));
};

// ============== form submit listeners =======================================
editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// ============== popup button listeners ======================================
editProfileButton.addEventListener("click", () => {
  setPopupCloseListeners(editProfilePopup);
  openPopup(editProfilePopup);

  const nameInput = editProfileForm.querySelector(".form__input_type_name");
  const aboutInput = editProfileForm.querySelector(".form__input_type_about");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

addCardButton.addEventListener("click", () => {
  setPopupCloseListeners(addCardPopup);
  openPopup(addCardPopup);
});

// ============== Render Initial cards =======================================
initialCards.forEach((data) =>
  renderCard(generateCardElement(data), cardsContainer)
);
