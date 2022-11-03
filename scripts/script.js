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
const handleClosePopup = (evt) => {
  if (evt.target.classList.contains("popup")) closePopup(evt.target);
};

const handlePopupOpen = (popup) => {
  popup.classList.add("popup_opened");
  const closePopupButton = popup.querySelector(".popup__close-btn");
  closePopupButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", handleClosePopup);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", handleClosePopup);
};

const getFormInputValues = (inputList) => {
  return Array.from(inputList).reduce(
    (acc, input) => ({ ...acc, [input.name]: input.value }),
    {}
  );
};

const cleanFormInputs = (form) => {
  [...form.elements].forEach((input) => (input.value = ""));
};

//=============== Form functions ==============================================
const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();

  const inputList = evt.target.querySelectorAll(".form__input");
  const { name, about } = getFormInputValues(inputList);
  profileName.textContent = name;
  profileAbout.textContent = about;
  cleanFormInputs(evt.target);
  closePopup(evt.target.closest(".popup"));
};

const fillEditProfileFormInputs = () => {
  const nameInput = editProfileForm.querySelector(".form__input_type_name");
  const aboutInput = editProfileForm.querySelector(".form__input_type_about");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
};

// ============== form submit listeners =======================================
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// ============== button listeners =============================================
editProfileButton.addEventListener("click", () => {
  handlePopupOpen(editProfilePopup);
  fillEditProfileFormInputs();
});

addCardButton.addEventListener("click", () => handlePopupOpen(addCardPopup));
