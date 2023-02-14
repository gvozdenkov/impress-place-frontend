'use strict';

import '../styles/index.scss';

import {
  getFormInputValues,
  setButtonState,
  getPopupElement,
  loadImage,
  showButtonLoadingEllipsis,
  hideButtonLoadingEllipsis,
  handleError,
} from '../utils/utils.js';

import {
  openPopup,
  closePopup,
  openedPopupWithForm,
  closePopupWithForm,
} from '../components/modal.js';

import {
  Card,
  changeLike,
  createCardElement,
  removeCard,
} from '../components/Card.js';

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
  popupAddCard,
  popupEditAvatar,
  cardTemplate,
  cardsContainerSelector,
  cardPopupImage,
  cardPopupTitle,
  popupCard,
  popupOpenedClass,
  profileAvatar,
  popupDeleteSelector,
  popupEditProfileSelector,
} from '../utils/constants.js';

import {
  validationConfig,
  profileConfig,
  serverConfig,
} from '../utils/config.js';

import {
  enableValidation,
  isFormValid,
  removeInputErrors,
} from '../components/validate.js';
import { Profile } from '../components/Profile';
import Api from '../components/Api';
import User from '../components/User.js';
import { Section } from '../components/Section';
import { Popup } from '../components/Popup.js';
import { IMAGE_POPUP_SELECTORS, POPUP } from '../utils/enum.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm';

const api = new Api(serverConfig);
const popupWithImage = new PopupWithImage(IMAGE_POPUP_SELECTORS);

document.addEventListener('DOMContentLoaded', () => {
  renderInitApp();
  // enableValidation(validationConfig);
});

async function renderInitApp() {
  try {
    const [userData, cards] = await api.getAppData();
    const user = new User(userData);
    const profile = new Profile({
      userData: user.getData(),
      renderer: (userData) => {
        profileName.textContent = userData.name;
        profileAbout.textContent = userData.about;
        profileAvatar.src = userData.avatar;
      },
    });

    profile.render();

    const cardList = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const card = new Card(
            cardTemplate,
            cardData,
            user.id(),
            handleLike,
            handleDelete,
            handleImageClick,
          );
          const cardElement = card.generate();
          cardList.addItem(cardElement);
        },
      },
      cardsContainerSelector,
    );

    cardList.render();
  } catch (err) {
    console.log(err);
    // handleError(err);
  }
}

async function handleLike(card) {
  try {
    const { id } = card.getData();
    const likedCard = await api.toggleLike(id, card.isLiked());
    card.changeLike(likedCard);
  } catch (err) {
    handleError(err);
  }
}
async function deleteCard(card) {
  try {
    const { id } = card.getData();
    await api.deleteCard(id);
    card.remove();
  } catch (err) {
    console.log(err);
  }
}

async function handleDelete(card) {
  const popupDelete = new PopupWithForm({
    popupSelector: popupDeleteSelector,
    handleSubmit: () => {
      deleteCard(card);
      popupDelete.close();
    },
  });

  popupDelete.open();
}

function handleImageClick(card) {
  const { name, link } = card.getData();
  popupWithImage.open({ link, name });
}

const popupEditProfile = new PopupWithForm({
  popupSelector: popupEditProfileSelector,
  handleSubmit: () => {
    console.log('edit');
  },
});

btnOpenPopupEditProfile.addEventListener('click', (evt) => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  popupEditProfile.open();
});

//
// async function handleLikeCard(card, isLiked) {
//   try {
//     changeLike(await toggleLike(card._id, isLiked));
//   } catch (err) {
//     handleError(err);
//   }
// }
//
// function handleDeleteCard(card) {
//   const handleSubmit = async (evt) => {
//     evt.preventDefault();
//
//     const submitButton = popupConfirmDelete.querySelector(submitButtonSelector);
//     showButtonLoadingEllipsis(submitButton, 'Удаление');
//
//     try {
//       await deleteCard(card._id);
//       removeCard(card);
//       closePopupWithForm(popupConfirmDelete, handleSubmit);
//     } catch (err) {
//       handleError(err);
//     } finally {
//       hideButtonLoadingEllipsis(submitButton, 'Да');
//     }
//   };
//
//   openedPopupWithForm(popupConfirmDelete, handleSubmit);
// }
//
// //=============== Form events =====================================
//
// const handleEditProfileSubmit = async (evt) => {
//   evt.preventDefault();
//
//   const submitButton = evt.submitter;
//   showButtonLoadingEllipsis(submitButton, 'Сохранение');
//
//   const form = evt.target;
//   const { name, about } = getFormInputValues(form);
//
//   try {
//     const updatedUser = await setUserInfo({ name, about });
//     user.setUserData(updatedUser);
//     profile.render();
//     closePopup(popupEditProfile);
//   } catch (err) {
//     handleError(err);
//   } finally {
//     hideButtonLoadingEllipsis(submitButton, 'Сохранить');
//   }
// };
//
// const handleAddCardSubmit = async (evt) => {
//   evt.preventDefault();
//
//   const submitButton = evt.submitter;
//   showButtonLoadingEllipsis(submitButton, 'Создание');
//
//   const { name, link } = getFormInputValues(formAddCard);
//
//   try {
//     const card = await addCard({ name, link });
//     const newCard = createCardElement(
//       card,
//       user.id(),
//       handleLikeCard,
//       handleDeleteCard,
//     );
//     renderCard(newCard, cardsContainer);
//     formAddCard.reset();
//     closePopup(popupAddCard);
//   } catch (err) {
//     handleError(err);
//   } finally {
//     hideButtonLoadingEllipsis(submitButton, 'Сохранить');
//   }
// };
//
// const handleEditAvatarSubmit = async (evt) => {
//   evt.preventDefault();
//
//   const submitButton = evt.target.querySelector(submitButtonSelector);
//   showButtonLoadingEllipsis(submitButton, 'Сохранение');
//
//   try {
//     const url = await loadImage(avatarInput.value);
//     const updatedUser = await setUserAvatar(url);
//     user.setUserData(updatedUser);
//     profile.render();
//     formEditAvatar.reset();
//     closePopup(popupEditAvatar);
//   } catch (err) {
//     handleError(err);
//   } finally {
//     hideButtonLoadingEllipsis(submitButton, 'Сохранить');
//   }
// };
//
// formEditProfile.addEventListener('submit', handleEditProfileSubmit);
// formAddCard.addEventListener('submit', handleAddCardSubmit);
// formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);
//
// // ============== popup events ======================================
// const handleOpenPopupWithForm = (evt) => {
//   const popup = getPopupElement(evt.target);
//   const form = popup.querySelector(validationConfig.formSelector);
//   const submitButton = popup.querySelector(
//     validationConfig.submitButtonSelector,
//   );
//
//   removeInputErrors(form);
//   openPopup(popup);
//   setButtonState(submitButton, isFormValid(form));
// };
//
// btnOpenPopupEditProfile.addEventListener('click', (evt) => {
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
//
//   handleOpenPopupWithForm(evt);
// });
//
// btnOpenPopupAddCard.addEventListener('click', handleOpenPopupWithForm);
//
// avatarContainer.addEventListener('click', handleOpenPopupWithForm);
