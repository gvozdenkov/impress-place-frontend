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
  profileAvatar,
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
} from './utils/constants.js';

import { validationConfig } from './utils/config.js';

import { enableValidation, isFormValid } from './components/validate.js';

export let userId;

async function renderInitialPage() {
  try {
    const [user, cards] = await getAppInfo();
    updateUserInfo(user);

    cards.reverse().forEach((card) => {
      renderCard(
        createCardElement(card, userId, handleLikeCard, handleDeleteCard),
        cardsContainer,
      );
    });
  } catch (err) {
    handleError(err);
  }
}

function updateUserInfo(user) {
  profileAbout.textContent = user.about;
  profileName.textContent = user.name;
  profileAvatar.src = user.avatar;

  userId = user._id;
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
    const user = await setUserInfo({ name, about });
    updateUserInfo(user);
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
      userId,
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
    const user = await setUserAvatar(url);
    updateUserInfo(user);
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

// ====================================

renderInitialPage();
enableValidation(validationConfig);
