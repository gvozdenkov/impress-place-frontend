// ============== page elements
const content = document.querySelector(".content");

const cardsContainer = content.querySelector(".photo-grid");
// buttons
const editProfileButton = content.querySelector(".profile__edit-btn");
const addCardButton = content.querySelector(".profile__add-btn");

// popups
const editProfilePopup = document.querySelector(".popup_edit-profile");
const editProfileForm = document.querySelector(".form_edit-profile");
const addCardPopup = document.querySelector(".popup_add-card");
const addCardForm = document.querySelector(".form_add-card");
// profile info
let profileName = content.querySelector(".profile__name");
let profileAbout = content.querySelector(".profile__about");

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
    if (isPopupOutsideClick) closePopup(popup);
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

  return cardElement;
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
  const cardElement = generateCardElement(data);

  renderCard(cardElement, cardsContainer);
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
initialCards.forEach((data) => {
  const cardElement = generateCardElement(data);
  renderCard(cardElement, cardsContainer);
});
