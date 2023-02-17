// todo: loader, error, состояние кнопки

import '../styles/index.scss';

import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { User } from '../components/User.js';
import { Section } from '../components/Section';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithFormConfirm } from '../components/PopupWithFormConfirm.js';
import { Validate } from '../components/Validate.js';

import {
  getFormInputValues,
  setButtonState,
  getPopupElement,
  loadImage,
  handleError,
  renderLoadingEllipsis,
} from '../utils/utils.js';

import {
  avatarInput,
  cardTemplate,
  cardsContainerSelector,
  popupEditAvatar,
} from '../utils/constants.js';

import {
  validationConfig,
  serverConfig,
  popupConfig,
  profileConfig,
} from '../utils/config.js';
import { Profile } from '../components/Profile';

let user;

document.addEventListener('DOMContentLoaded', () => {
  const popupWithImage = new PopupWithImage({
    popupSelector: popupConfig.typeImageSelector,
    imageSelector: popupConfig.imageSelector,
    titleSelector: popupConfig.imageTitleSelector,
  });

  const popupDelete = new PopupWithFormConfirm(popupConfig.typeDeleteSelector);

  async function renderApp() {
    try {
      const api = new Api(serverConfig);

      const [userData, cards] = await api.getAppData();
      const profile = new Profile(profileConfig);
      profile.setUserInfo(userData);
      const { _id } = profile.getUserInfo();

      // const createFeed = (cards, user) => {
      //   const section = new Section({
      //     data: cards,
      //     renderer: (card) => renderCards(card, user, section),
      //     containerSelector: CARD.WRAPPER,
      //   });
      //   return section;
      // };

      const cardList = new Section(
        {
          renderer: (cardData) => {
            cardList.addItem(crateCard(cardData, _id));
          },
        },
        cardsContainerSelector,
      );

      cardList.render(cards);

      profile.addEventListeners([
        {
          selector: popupConfig.editAvatarButtonSelector,
          handleClick: () => handleEditAvatarClick(api, profile),
        },
        {
          selector: popupConfig.editProfileButtonSelector,
          handleClick: () => handleEditProfileClick(api, profile),
        },
        {
          selector: popupConfig.addCardButtonSelector,
          handleClick: () => handleAddCardClick(api, profile),
        },
      ]);

      const validate = new Validate(validationConfig);
      validate.enableValidation();
    } catch (err) {
      console.log(err);
      // handleError(err);
    }
  }

  function crateCard(cardData, userId) {
    const card = new Card(cardTemplate, cardData, userId, {
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
        popupDelete.setSubmitHandler(async () => {
          try {
            const { id } = card.getData();
            await api.deleteCard(id);
            card.remove();
            popupDelete.close();
          } catch (err) {
            handleError(err);
          }
        });
        popupDelete.open();
      },

      handleImageClick: () => {
        popupWithImage.open(cardData);
      },
    });

    return card.generate();
  }

  async function handleSubmitAvatar(popup, api, profile) {
    const form = popup.getFormElement();
    try {
      renderLoadingEllipsis(form, 'Сохранение', true);
      const url = await loadImage(avatarInput.value);
      const { avatar } = await api.updateUserAvatar(url);
      profile.setUserInfo({ avatar });
      popup.close();
    } catch (err) {
      console.log(err);
      // handleError(err);
    } finally {
      renderLoadingEllipsis(form, 'Сохранить');
    }
  }

  async function handleSubmitEditProfile(popup, api, profile) {
    const form = popup.getFormElement();
    try {
      const { name, about } = getFormInputValues(form);
      renderLoadingEllipsis(form, 'Сохранение', true);
      const { newName, newAbout } = await api.updateUser({ name, about });
      profile.setUserInfo({ name: newName, about: newAbout });
      popup.close();
    } catch (err) {
      // handleError(err);
      console.log(err);
    } finally {
      renderLoadingEllipsis(form, 'Сохранить');
    }
  }

  async function handleSubmitAddCard(popup, api, profile) {
    const form = popup.getFormElement();
    try {
      const { name, link } = getFormInputValues(form);
      renderLoadingEllipsis(form, 'Создание', true);
      const cardData = await api.addCard({ name, link });
      const { _id } = profile.getUserInfo();
      const newCard = crateCard(cardData, _id);
      cardList.addItem(newCard);
      popup.close();
    } catch (err) {
      console.error(err);
    } finally {
      renderLoadingEllipsis(form, 'Создать');
    }
  }

  function handleEditAvatarClick(api, profile) {
    const popup = new PopupWithForm({
      popupSelector: popupConfig.typeEditVatarSelector,
    });
    popup.updateHandleSubmit(() => handleSubmitAvatar(popup, api, profile));

    popup.open();
  }

  function handleEditProfileClick(api, profile) {
    const popup = new PopupWithForm({
      popupSelector: popupConfig.typeEditProfileSelector,
    });
    const { name, about } = profile.getUserInfo();
    popup.fillInputs({ name, about });
    popup.updateHandleSubmit(() =>
      handleSubmitEditProfile(popup, api, profile),
    );

    popup.open();
  }

  function handleAddCardClick(api, profile) {
    const popup = new PopupWithForm({
      popupSelector: popupConfig.typeAddCardSelector,
    });
    popup.updateHandleSubmit(() => handleSubmitAddCard(popup, api, profile));

    popup.open();
  }

  renderApp();
});

// ================ Popup buttons listeners ========================
