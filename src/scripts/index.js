//  Импорты всех модулей и стилей
import "../pages/index.css";
import { addCard, deleteCard, handleLike } from "./card.js";
import { attachEventListeners, openModal, closeModal } from "./modal.js";
import { enableValidation, validationConfig } from "./validation.js";
import {
  addCardToServer,
  changeData,
  editAvatar,
  getProfile,
  getCards,
} from "./api.js";

//  Константы: Темплейты и DOM-элементы
export const cardTemplate = document.querySelector("#card-template").content;

const formElementProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formElementProfile.querySelector('input[name="name"]');
const jobInput = formElementProfile.querySelector('input[name="description"]');
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

export const formElementPlace = document.querySelector(
  'form[name="new-place"]'
);
const namePlaceInput = formElementPlace.querySelector(
  'input[name="place-name"]'
);
const linkInput = formElementPlace.querySelector('input[name="link"]');
export const placeList = document.querySelector(".places__list");

const buttonOpenProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
export const popupDeleteCard = document.querySelector(".popup_delete_card");

const profileImage = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_edit_avatar");
export const formAvatar = popupEditAvatar.querySelector(
  'form[name="edit-avatar"]'
);
const linkInputAvatar = formAvatar.querySelector('input[name="link-avatar"]');

//   Глобальные переменные
export let myId = null;
export let idStudent = [];

// Функция открытия попапа с изображением
export function openImgPopup(src, caption) {
  const popupImageModal = document.querySelector(".popup_type_image");
  const popupImageElem = popupImageModal.querySelector(".popup__image");
  const popupCaptionElem = popupImageModal.querySelector(".popup__caption");

  popupImageElem.src = src;
  popupImageElem.alt = caption;
  popupCaptionElem.textContent = caption;

  openModal(popupImageModal);
}

// Функция редактирования профиля
export const editProfile = (profile) => {
  const imgProfile = document.querySelector(".profile__image");
  const nameElement = document.querySelector(".profile__title");
  const aboutElement = document.querySelector(".profile__description");

  imgProfile.style.backgroundImage = `url(${profile.avatar})`;
  imgProfile.alt = `Аватар пользователя ${profile.name}`;
  nameElement.textContent = profile.name;
  aboutElement.textContent = profile.about;

  myId = profile._id;
};

// смена текста кнопки
export function renderLoading(
  isLoading,
  buttonElement,
  loadingText = "Сохранение...",
  defaultText = "Сохранить"
) {
  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = defaultText;
  }
}

//  Основная загрузка данных с сервера
Promise.all([getProfile(), getCards()])
  .then(([profile, cards]) => {
    editProfile(profile);
    cards.forEach((cardData) => {
      const ownerId = cardData.owner._id;
      idStudent.push(ownerId);

      const cardElement = addCard(
        cardData,
        deleteCard,
        handleLike,
        openImgPopup,
        myId,
        openModal,
        closeModal
      );
      placeList.append(cardElement);
    });
  })
  .catch((error) => {
    console.log("Ошибка при загрузке данных:", error);
  });

//  Обработчики событий

// Открытие попапа редактирования профиля
buttonOpenProfile.addEventListener("click", () => {
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  openModal(popupEditProfile);
});

// Открытие попапа добавления карточки
buttonAddCard.addEventListener("click", () => {
  openModal(popupAddCard);
});

// Открытие попапа изменения аватара
profileImage.addEventListener("click", () => {
  openModal(popupEditAvatar);
});

// Привязка обработчиков закрытия попапов
attachEventListeners(popupEditProfile);
attachEventListeners(popupAddCard);
attachEventListeners(popupImage);
attachEventListeners(popupDeleteCard);
attachEventListeners(popupEditAvatar);

// Обработчики отправки форм

// Отправка формы редактирования профиля
formElementProfile.addEventListener("submit", handleFormSubmitProfile);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  const button = formElementProfile.querySelector(".popup__button");
  renderLoading(true, button);

  const nameProfile = nameInput.value;
  const jobProfile = jobInput.value;

  changeData(nameProfile, jobProfile)
    .then((data) => {
      titleProfile.textContent = data.name;
      descriptionProfile.textContent = data.about;
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.log("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

// Отправка формы добавления новой карточки
formElementPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const button = formElementPlace.querySelector(".popup__button");
  renderLoading(true, button, "Создание...");

  const newCardData = {
    name: namePlaceInput.value,
    link: linkInput.value,
  };

  addCardToServer(newCardData.name, newCardData.link)
    .then((newCard) => {
      newCard.owner = { _id: myId };

      const newCardElement = addCard(
        newCard,
        deleteCard,
        handleLike,
        openImgPopup,
        myId,
        openModal,
        closeModal
      );
      placeList.prepend(newCardElement);

      formElementPlace.reset();
      closeModal(popupAddCard);
    })
    .catch((error) => {
      console.log("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      renderLoading(false, button);
    });
});

// Отправка формы редактирования аватара
formAvatar.addEventListener("submit", handleFormEditAvatar);

function handleFormEditAvatar(evt) {
  evt.preventDefault();
  const button = formAvatar.querySelector(".popup__button");
  const linkInputAvatar = formAvatar.querySelector('input[name="link-avatar"]');
  const newAvatar = { avatar: linkInputAvatar.value };
  //смена текста кнопки
  renderLoading(true, button);

  editAvatar(newAvatar)
    .then((response) => {
      const profileImage = document.querySelector(".profile__image");
      profileImage.style.backgroundImage = `url(${response.avatar})`;
      closeModal(popupEditAvatar);
      formAvatar.reset();
    })
    .catch((error) => {
      console.log("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

//  Включение валидации всех форм
enableValidation(validationConfig);
