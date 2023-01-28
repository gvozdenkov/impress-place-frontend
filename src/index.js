import '../src/styles/index.scss';

import {
  addCard,
  deleteLike,
  API_ERROR_MESSAGE,
  getAppInfo,
  setLike,
  setUserAvatar,
  setUserInfo,
  deleteCard,
} from './components/api.js';

import {
  getFormInputValues,
  removeInputErrors,
  setButtonState,
  getPopupElement,
  loadImage,
  showButtonLoadingEllipsis,
  hideButtonLoadingEllipsis,
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

function renderInitialPage() {
  getAppInfo()
    .then(([user, cards]) => {
      updateUserInfo(user);

      cards.reverse().forEach((card) => {
        renderCard(
          createCardElement(card, userId, handleLikeCard, handleDeleteCard),
          cardsContainer,
        );
      });
    })
    .catch((err) => {
      console.log(
        `Ошибка ${err.status} при инициализации приложения: ${API_ERROR_MESSAGE}`,
      );
    });
}

function updateUserInfo(user) {
  profileAbout.textContent = user.about;
  profileName.textContent = user.name;
  profileAvatar.src = user.avatar;

  userId = user._id;
}

function handleLikeCard(card, isLiked) {
  // debugger;
  isLiked
    ? deleteLike(card._id)
        .then((card) => {
          changeLike(card);
        })
        .catch((err) => {
          console.log(
            `Ошибка ${err.status} удаления лайка карточки: ${API_ERROR_MESSAGE}`,
          );
        })
    : setLike(card._id)
        .then((card) => {
          changeLike(card);
        })
        .catch((err) => {
          console.log(
            `Ошибка ${err.status} лайка карточки: ${API_ERROR_MESSAGE}`,
          );
        });
}

function handleDeleteCard(card) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    const submitButton = popupConfirmDelete.querySelector(submitButtonSelector);
    showButtonLoadingEllipsis(submitButton, 'Удаление');

    deleteCard(card._id)
      .then(() => {
        removeCard(card);
        closePopupWithForm(popupConfirmDelete, handleSubmit);
      })
      .catch((err) => {
        console.log(
          `Ошибка ${err.status} удаления карточки: ${API_ERROR_MESSAGE}`,
        );
      })
      .finally(() => {
        hideButtonLoadingEllipsis(submitButton, 'Да');
      });
  };

  openedPopupWithForm(popupConfirmDelete, handleSubmit);
}

//=============== Form events =====================================

const handleEditProfileSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(submitButtonSelector);
  showButtonLoadingEllipsis(submitButton, 'Сохранение');

  const form = evt.target;
  const { name, about } = getFormInputValues(form);

  setUserInfo({ name, about })
    .then((user) => {
      updateUserInfo(user);
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(
        `Ошибка ${err.status} редактирования профиля: ${API_ERROR_MESSAGE}`,
      );
    })
    .finally(() => {
      hideButtonLoadingEllipsis(submitButton, 'Сохранить');
    });
};

const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(submitButtonSelector);
  showButtonLoadingEllipsis(submitButton, 'Создание');

  const { name, link } = getFormInputValues(formAddCard);
  addCard({ name, link })
    .then((card) => {
      const newCard = createCardElement(card);
      renderCard(newCard, cardsContainer);
      formAddCard.reset();
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(
        `Ошибка ${err.status} добавления карточки: ${API_ERROR_MESSAGE}`,
      );
    })
    .finally(() => {
      hideButtonLoadingEllipsis(submitButton, 'Создать');
    });
};

const handleEditAvatarSubmit = (evt) => {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(submitButtonSelector);
  showButtonLoadingEllipsis(submitButton, 'Сохранение');

  loadImage(avatarInput.value)
    .then((url) => {
      setUserAvatar(url)
        .then((user) => {
          updateUserInfo(user);
          formEditAvatar.reset();
          closePopup(popupEditAvatar);
        })
        .catch((err) => {
          console.log(
            `Ошибка загрузки аватара ${err.status}: ${API_ERROR_MESSAGE}`,
          );
        });
    })
    .catch((url) => {
      console.log(`image not found for url ${url}`);
    })
    .finally(() => {
      hideButtonLoadingEllipsis(submitButton, 'Сохранить');
    });
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
