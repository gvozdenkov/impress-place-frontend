import '../src/styles/index.scss';

import {
  addCard,
  getAppInfo,
  setUserAvatar,
  setUserInfo,
  deleteCard,
  toggleLike,
} from './components/api.js';

import {
  getFormInputValues,
  removeInputErrors,
  setButtonState,
  getPopupElement,
  loadImage,
  showButtonLoadingEllipsis,
  hideButtonLoadingEllipsis,
  handleError,
} from './utils/utils.js';

import {
  openPopup,
  closePopup,
  openedPopupWithForm,
  closePopupWithForm,
} from './components/modal.js';

import {
  changeLike,
  createCardElement,
  removeCard,
  renderCard,
} from './components/card.js';

import {
  profileName,
  profileAbout,
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
  submitButtonSelector,
  popupConfirmDelete,
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  profileConfig,
} from './utils/constants.js';

import { validationConfig } from './utils/config.js';

import { enableValidation, isFormValid } from './components/validate.js';
import { User } from './components/user';
import { UserProfile } from './components/userProfile';

let user;
let profile;

renderInitApp();
enableValidation(validationConfig);

async function renderInitApp() {
  try {
    const [userData, cards] = await getAppInfo();
    user = User(userData);
    profile = UserProfile(user, profileConfig);
    profile.render();

    cards.reverse().forEach((card) => {
      renderCard(
        createCardElement(card, user.id(), handleLikeCard, handleDeleteCard),
        cardsContainer,
      );
    });
  } catch (err) {
    handleError(err);
  }
}

async function handleLikeCard(card, isLiked) {
  try {
    changeLike(await toggleLike(card._id, isLiked));
  } catch (err) {
    handleError(err);
  }
}

function handleDeleteCard(card) {
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const submitButton = popupConfirmDelete.querySelector(submitButtonSelector);
    showButtonLoadingEllipsis(submitButton, 'Удаление');

    try {
      await deleteCard(card._id);
      removeCard(card);
      closePopupWithForm(popupConfirmDelete, handleSubmit);
    } catch (err) {
      handleError(err);
    } finally {
      hideButtonLoadingEllipsis(submitButton, 'Да');
    }
  };

  openedPopupWithForm(popupConfirmDelete, handleSubmit);
}

//=============== Form events =====================================

const handleEditProfileSubmit = async (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  showButtonLoadingEllipsis(submitButton, 'Сохранение');

  const form = evt.target;
  const { name, about } = getFormInputValues(form);

  try {
    const updatedUser = await setUserInfo({ name, about });
    user.setUserData(updatedUser);
    profile.render();
    closePopup(popupEditProfile);
  } catch (err) {
    handleError(err);
  } finally {
    hideButtonLoadingEllipsis(submitButton, 'Сохранить');
  }
};

const handleAddCardSubmit = async (evt) => {
  evt.preventDefault();

  const submitButton = evt.submitter;
  showButtonLoadingEllipsis(submitButton, 'Создание');

  const { name, link } = getFormInputValues(formAddCard);

  try {
    const card = await addCard({ name, link });
    const newCard = createCardElement(
      card,
      user.id(),
      handleLikeCard,
      handleDeleteCard,
    );
    renderCard(newCard, cardsContainer);
    formAddCard.reset();
    closePopup(popupAddCard);
  } catch (err) {
    handleError(err);
  } finally {
    hideButtonLoadingEllipsis(submitButton, 'Сохранить');
  }
};

const handleEditAvatarSubmit = async (evt) => {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(submitButtonSelector);
  showButtonLoadingEllipsis(submitButton, 'Сохранение');

  try {
    const url = await loadImage(avatarInput.value);
    const updatedUser = await setUserAvatar(url);
    user.setUserData(updatedUser);
    profile.render();
    formEditAvatar.reset();
    closePopup(popupEditAvatar);
  } catch (err) {
    handleError(err);
  } finally {
    hideButtonLoadingEllipsis(submitButton, 'Сохранить');
  }
};

formEditProfile.addEventListener('submit', handleEditProfileSubmit);
formAddCard.addEventListener('submit', handleAddCardSubmit);
formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);

// ============== popup events ======================================
const handleOpenPopupWithForm = (evt) => {
  const popup = getPopupElement(evt.target);
  const form = popup.querySelector(validationConfig.formSelector);
  const submitButton = popup.querySelector(
    validationConfig.submitButtonSelector,
  );

  removeInputErrors(form);
  openPopup(popup);
  setButtonState(submitButton, isFormValid(form));
};

btnOpenPopupEditProfile.addEventListener('click', (evt) => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  handleOpenPopupWithForm(evt);
});

btnOpenPopupAddCard.addEventListener('click', handleOpenPopupWithForm);

avatarContainer.addEventListener('click', handleOpenPopupWithForm);
