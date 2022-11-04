// ============== page elements
const content = document.querySelector(".content");
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

// ============== Popup functions =============================================
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const setPopupCloseListeners = (popup) => {
  const closePopupButton = popup.querySelector(".popup__close-btn");
  closePopupButton.addEventListener("click", () => closePopup(popup));
};

const getFormInputValues = (form) => {
  return Array.from(form.elements).reduce(
    (acc, input) => ({ ...acc, [input.name]: input.value }),
    {}
  );
};

const cleanFormInputs = (form) => {
  [...form.elements].forEach((input) => {
    input.nodeName === "INPUT" ? (input.value = "") : null;
  });
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
