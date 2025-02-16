import { initialCards } from "./cards.js";
import "../pages/index.css";

import avatarImage from "../images/avatar.jpg";
import cardOneImage from "../images/card_1.jpg";
import cardTwoImage from "../images/card_2.jpg";
import cardThreeImage from "../images/card_3.jpg";
import iconActive from "../images/like-active.svg";
import iconInActive from "../images/like-inactive.svg";

import { addCard } from "./card.js";
import { deleteCard } from "./card.js";
import { handleLike } from "./card.js";

import { openModal } from "./modal.js";
import { closeModal } from "./modal.js";
import {handleEscKeyUp} from "./modal.js"

const imagesFile = [
  { name: "iconIn", link: iconInActive },
  { name: "iconA", link: iconActive },
  { name: "avatar", link: avatarImage },
  { name: "cardOne", link: cardOneImage },
  { name: "cardTwo", link: cardTwoImage },
  { name: "cardThree", link: cardThreeImage },
];

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const formElementPlace = document.querySelector('form[name="new-place"]');
const namePlaceInput = formElementPlace.querySelector( 'input[name="place-name"]');
const linkInput = formElementPlace.querySelector('input[name="link"]');
const buttonAddCard = document.querySelector(".profile__add-button");
//кнопка открытия редактирования профиля
const buttonOpenProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
// Находим форму в DOM
const formElement = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (i) {
  const cardList = addCard(i, deleteCard, handleLike, openImgPopup);
  placeList.append(cardList);
});

buttonAddCard.addEventListener("click", () => {
  formElementPlace.reset();
  openModal(popupAddCard);
});

buttonOpenProfile.addEventListener("click", () => {
  nameInput.value = titleProfile.textContent;
  jobInput.value = descriptionProfile.textContent;
  openModal(popupEditProfile);
});


export const attachEventListeners = (popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");

  closeButton.addEventListener("click", () => {
    closeModal(popupElement);
  });

  popupElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popupElement);
    }
  });
};

attachEventListeners(popupEditProfile);
attachEventListeners(popupAddCard);
attachEventListeners(popupImage);

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameProfile = nameInput.value;
  const jobProfile = jobInput.value;

  titleProfile.textContent = nameProfile;
  descriptionProfile.textContent = jobProfile;

  closeModal(popupEditProfile);
};

formElement.addEventListener("submit", handleFormSubmit);

// Обработка отправки формы
formElementPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = namePlaceInput.value;
  const link = linkInput.value;
  const newCard = {
    name: name,
    link: link,
  };

  const cardElement = addCard(newCard, deleteCard, handleLike, openImgPopup);
  placeList.prepend(cardElement);
  closeModal(popupAddCard);
});

function openImgPopup(src, caption) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  popupImage.src = src;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
};
