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
  popupConfirmDelete,
  popupEditProfile,
  popupAddCard,
  popupEditAvatar,
  cardTemplate,
  cardsContainerSelector,
  cardPopupImage,
  cardPopupTitle,
  popupCard,
  popupOpenedClass,
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
import { UserProfile } from '../components/UserProfile';
import Api from '../components/Api';
import User from '../components/User.js';
import { Section } from '../components/Section';
import { Popup } from '../components/Popup.js';
import { POPUP } from '../utils/enum.js';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api(serverConfig);

  const handleLike = async (card) => {
    try {
      const { id } = card.getData();
      const newCard = await api.toggleLike(id, card.isLiked());
      console.log(newCard);
      card.changeLike(newCard)
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (card) => {

    // const submitButton = popupConfirmDelete.querySelector(submitButtonSelector);
    // showButtonLoadingEllipsis(submitButton, 'Удаление');
    // try {
    //   const { id } = card.getData();
    //   await api.deleteCard(id);
    //
    //   closePopupWithForm(popupConfirmDelete, handleDelete);
    // } catch (err) {
    //   handleError(err);
    // } finally {
    //   hideButtonLoadingEllipsis(submitButton, 'Да');
    // }

    openedPopupWithForm(popupConfirmDelete, handleDelete);
    console.log(`delete ${name} card`);
  };



  const handleImageClick = (card) => {
    // const { name, link } = card.getData();
    // cardPopupImage.src = link;
    // cardPopupImage.alt = `${name}.`;
    // cardPopupTitle.textContent = name;
    const popup = new Popup(POPUP.TYPE_IMAGE)
    popup.open();
  };

  async function renderInitApp() {
    try {
      const [userData, cards] = await api.getAppData();

      const user = new User(userData);
      const profile = new UserProfile(profileConfig);
      profile.render(user.getInfo());

      const cardList = new Section(
        {
          data: cards,
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
            cardList.setItem(cardElement);
          },
        },
        cardsContainerSelector,
      );

      cardList.renderItems();
    } catch (err) {
      console.log(err);
      // handleError(err);
    }
  }

  renderInitApp();

})

// enableValidation(validationConfig);

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
