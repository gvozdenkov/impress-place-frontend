// todo: loader, error, состояние кнопки

import '../styles/index.scss';

import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Validate } from '../components/Validate.js';
import { ErrorPopup } from '../components/ErrorPopup.js';
import { Profile } from '../components/Profile';

import {
  getFormInputValues,
  loadImage,
  renderLoadingEllipsis,
} from '../utils/utils.js';

import {
  avatarInput,
  cardTemplate,
  cardsContainerSelector,
} from '../utils/constants.js';

import {
  serverConfig,
  popupConfig,
  profileConfig,
} from '../utils/config.js';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api(serverConfig);
  const profile = new Profile(profileConfig, {
    getUser: async () => {
      return await api.getUser();
    },
  });
  const validateEditAvatar = new Validate('.edit-avatar-form');
  validateEditAvatar.enableValidation();
  const validateEditProfile = new Validate('.edit-profile-form');
  validateEditProfile.enableValidation();
  const validateAddCard = new Validate('.add-card-form');
  validateAddCard.enableValidation();
  const cardList = new Section(
    {
      renderer: (cards) => {
        cards.reverse().forEach((card) => {
          cardList.addItem(crateCard(card));
        });
      },
    },
    cardsContainerSelector,
  );

  const popupImageDetail = new PopupWithImage({
    popupSelector: popupConfig.typeImageSelector,
    imageSelector: popupConfig.imageSelector,
    titleSelector: popupConfig.imageTitleSelector
  });
  popupImageDetail.setEventListeners();
  const popupCardDelete = new PopupWithForm({ popupSelector: popupConfig.typeDeleteSelector });
  popupCardDelete.setEventListeners();
  const popupEditAvatar = new PopupWithForm({ popupSelector: popupConfig.typeEditVatarSelector });
  popupEditAvatar.setEventListeners();
  const popupEditProfile = new PopupWithForm({ popupSelector: popupConfig.typeEditProfileSelector });
  popupEditProfile.setEventListeners();
  const popupAddCard = new PopupWithForm({ popupSelector: popupConfig.typeAddCardSelector });
  popupAddCard.setEventListeners();

  const errorList = new Section(
    {
      renderer: (error) => {
        errorList.addItem(error);
      },
    },
    '.error-list',
  );

  renderApp();

  async function renderApp() {
    try {
      const [userData, cards] = await api.getAppData();

      profile.setUserInfo(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      profile.setEventListeners([
        {
          selector: popupConfig.editAvatarButtonSelector,
          handleClick: handleEditAvatarClick,
        },
        {
          selector: popupConfig.editProfileButtonSelector,
          handleClick: handleEditProfileClick,
        },
        {
          selector: popupConfig.addCardButtonSelector,
          handleClick: handleAddCardClick,
        },
      ]);

      const { _id } = await profile.getUserInfo();
      const cardsWithUserId = cards.map((obj) => ({ ...obj, userId: _id }));
      cardList.render(cardsWithUserId);
    } catch (err) {
      showErrorPopup(err);
      console.error(err);
    }
  }

  function crateCard(cardData) {
    const card = new Card(
      cardTemplate,
      { ...cardData, userId: cardData.userId },
      {
        handleLike: async (card) => {
          try {
            const { id } = card.getData();
            const likedCard = await api.toggleLike(id, card.isLiked());
            card.changeLike(likedCard);
          } catch (err) {
            showErrorPopup(err);
            console.error(err);
          }
        },

        handleDelete: (card) => {
          console.log('click');
          popupCardDelete.updateHandleSubmit(async () => {
            try {
              console.log('submit');
              const { id } = card.getData();
              await api.deleteCard(id);
              card.remove();
              popupCardDelete.close();
              popupCardDelete.reset();
            } catch (err) {
              showErrorPopup(err);
              console.error(err);
            }
          });
          popupCardDelete.open();
        },

        handleImageClick: () => {
          popupImageDetail.open(cardData);
        },
      },
    );

    return card.generate();
  }

  // Click handlers

  function handleEditAvatarClick() {
    popupEditAvatar.updateHandleSubmit(() => handleSubmitAvatar(popupEditAvatar));
    popupEditAvatar.open();
  }

  async function handleEditProfileClick() {
    const user = JSON.parse(sessionStorage.user);
    popupEditProfile.fillInputs({ name: user.name, about: user.about });
    popupEditProfile.updateHandleSubmit(() => handleSubmitEditProfile(popupEditProfile));
    popupEditProfile.open(() => saveSessionData(popupEditProfile));
  }

  function handleAddCardClick() {
    popupAddCard.updateHandleSubmit(handleSubmitAddCard);
    popupAddCard.open();
  }

  // Submit handlers
  async function handleSubmitAvatar(popup) {
    const form = popup.getFormElement();
    try {
      renderLoadingEllipsis(form, 'Сохранение', true);
      const url = await loadImage(avatarInput.value);
      const updatedUser = await api.updateUserAvatar(url);
      const { avatar } = updatedUser;
      profile.setUserInfo({ avatar });
      popup.close();
    } catch (err) {
      showErrorPopup(err);
    } finally {
      renderLoadingEllipsis(form, 'Сохранить');
    }
  }

  async function handleSubmitEditProfile(popup) {
    const form = popup.getFormElement();
    try {
      const { name, about } = getFormInputValues(form);
      renderLoadingEllipsis(form, 'Сохранение', true);
      const updatedUser = await api.updateUser({ name, about });
      profile.setUserInfo({ name: updatedUser.name, about: updatedUser.about });
      popup.close();
    } catch (err) {
      showErrorPopup(err);
      console.error(err);
    } finally {
      renderLoadingEllipsis(form, 'Сохранить');
    }
  }

  async function handleSubmitAddCard() {
    try {
      const form = popupAddCard.getFormElement();
      const { name, link } = getFormInputValues(form);
      renderLoadingEllipsis(form, 'Создание', true);
      const cardData = await api.addCard({ name, link });
      const { _id } = JSON.parse(sessionStorage.user);
      const newCard = crateCard({ ...cardData, userId: _id });
      cardList.addItem(newCard);
      popupAddCard.close();
      popupAddCard.reset();
      renderLoadingEllipsis(form, 'Создать');
    } catch (err) {
      showErrorPopup(err);
    }
  }

  function saveSessionData(popup) {
    const form = popup.getFormElement();
    const { name, about } = getFormInputValues(form);
    const user = JSON.parse(sessionStorage.user);
    user.name = name;
    user.about = about;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  function showErrorPopup(err) {
    const error = new ErrorPopup(
      { code: err.status, message: err.message },
      '#error-popup-template',
    );

    errorList.addItem(error.createError());
  }
});
