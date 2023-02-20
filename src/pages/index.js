// todo: loader, error, состояние кнопки

import '../styles/index.scss';

import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Validate } from '../components/Validate.js';

import {
  getFormInputValues,
  loadImage,
  handleError,
  renderLoadingEllipsis,
} from '../utils/utils.js';

import {
  avatarInput,
  cardTemplate,
  cardsContainerSelector,
} from '../utils/constants.js';

import {
  validationConfig,
  serverConfig,
  popupConfig,
  profileConfig,
} from '../utils/config.js';
import { Profile } from '../components/Profile';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api(serverConfig);

  const profile = new Profile(profileConfig, {
    getUser: async () => {
      return await api.getUser();
    },
  });

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

  const validate = new Validate(validationConfig);
  validate.enableValidation();

  renderApp();

  async function renderApp() {
    try {
      const [userData, cards] = await api.getAppData();

      profile.setUserInfo(userData);
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
      console.error(err);
      // err.then((res) => console.error(res.message));
      // handleError(err);
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
            handleError(err);
          }
        },

        handleDelete: (card) => {
          const popupDelete = new PopupWithForm({
            popupSelector: popupConfig.typeDeleteSelector,
          });
          popupDelete.updateHandleSubmit(async () => {
            try {
              const { id } = card.getData();
              await api.deleteCard(id);
              card.remove();
              popupDelete.close();
            } catch (err) {
              console.log(err);
              // handleError(err);
            }
          });
          popupDelete.open();
        },

        handleImageClick: () => {
          const popupWithImage = new PopupWithImage({
            popupSelector: popupConfig.typeImageSelector,
            imageSelector: popupConfig.imageSelector,
            titleSelector: popupConfig.imageTitleSelector,
          });
          popupWithImage.open(cardData);
        },
      },
    );

    return card.generate();
  }

  // Click handlers

  function handleEditAvatarClick() {
    const popup = new PopupWithForm({
      popupSelector: popupConfig.typeEditVatarSelector,
    });
    popup.updateHandleSubmit(() => handleSubmitAvatar(popup));

    popup.open();
  }

  async function handleEditProfileClick() {
    const popup = new PopupWithForm({
      popupSelector: popupConfig.typeEditProfileSelector,
    });
    const { name, about } = await profile.getUserInfo();
    popup.fillInputs({ name, about });
    popup.updateHandleSubmit(() => {
      handleSubmitEditProfile(popup);
    });

    popup.open();
  }

  function handleAddCardClick() {
    const popup = new PopupWithForm({
      popupSelector: popupConfig.typeAddCardSelector,
    });
    popup.updateHandleSubmit(() => handleSubmitAddCard(popup));

    popup.open();
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
      console.log(err);
      // handleError(err);
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
      // handleError(err);
      console.log(err);
    } finally {
      renderLoadingEllipsis(form, 'Сохранить');
    }
  }

  async function handleSubmitAddCard(popup) {
    const form = popup.getFormElement();
    try {
      const { name, link } = getFormInputValues(form);
      renderLoadingEllipsis(form, 'Создание', true);
      const cardData = await api.addCard({ name, link });
      const { _id } = await profile.getUserInfo();
      const newCard = crateCard({ ...cardData, userId: _id });
      cardList.addItem(newCard);
      popup.close();
    } catch (err) {
      console.error(err);
    } finally {
      renderLoadingEllipsis(form, 'Создать');
    }
  }
});
