export const validationConfig = {
  formValidateSelector: '.validate',
  formFieldSelector: '.form__field',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorElementTemplateId: '#form-input-error-template',
  errorElementSelector: '.form__input-error',
  errorElementClassActive: 'form__input-error_active',
};

export const serverConfig = {
  baseUrl: `${process.env.HOST}/v1/${process.env.GROUP_ID}`,
  headers: {
    authorization: process.env.ACCESS_TOKEN,
    'Content-Type': 'application/json',
  },
};

export const profileConfig = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-img',
};

export const popupConfig = {
  typeImageSelector: '.popup_type_image',
  imageSelector: '.popup__image',
  imageTitleSelector: '.popup__image-title',

  typeDeleteSelector: '.popup_type_delete',
  typeEditVatarSelector: '.popup_type_edit-avatar',
  typeEditProfileSelector: '.popup_type_edit-profile',
  typeAddCardSelector: '.popup_type_add-card',

  editProfileButtonSelector: '.profile__edit-btn',
  editAvatarButtonSelector: '.profile__avatar',
  addCardButtonSelector: '.profile__add-btn',
};
