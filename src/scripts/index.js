import { initialCards } from "./cards.js";
import "../pages/index.css";
import { addCard, deleteCard, handleLike} from "./card.js";
import { attachEventListeners, openModal, closeModal, handleEscKeyUp,} from "./modal.js";

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placeList = document.querySelector(".places__list");
const formElementPlace = document.querySelector('form[name="new-place"]');
const namePlaceInput = formElementPlace.querySelector('input[name="place-name"]');
const linkInput = formElementPlace.querySelector('input[name="link"]');
const buttonAddCard = document.querySelector(".profile__add-button");
//кнопка открытия редактирования профиля
const buttonOpenProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// Находим форму в DOM
const formElementProfile = document.querySelector('form[name="edit-profile"]');
// Находим поля формы в DOM
const nameInput = formElementProfile.querySelector('input[name="name"]');
const jobInput = formElementProfile.querySelector('input[name="description"]');
const titleProfile = document.querySelector(".profile__title");
const descriptionProfile = document.querySelector(".profile__description");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  const cardList = addCard(card, deleteCard, handleLike, openImgPopup);
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

attachEventListeners(popupEditProfile);
attachEventListeners(popupAddCard);
attachEventListeners(popupImage);

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  const nameProfile = nameInput.value;
  const jobProfile = jobInput.value;

  titleProfile.textContent = nameProfile;
  descriptionProfile.textContent = jobProfile;

  closeModal(popupEditProfile);
}

formElementProfile.addEventListener("submit", handleFormSubmitProfile);

// Обработка отправки формы
formElementPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = namePlaceInput.value;
  const link = linkInput.value;
  const newCard = {
    name: name,
    link: link,
  };

  const newCardPlace = addCard(newCard, deleteCard, handleLike, openImgPopup);
  placeList.prepend(newCardPlace);
  closeModal(popupAddCard);
});

function openImgPopup(src, caption) {
  const popupImageModal = document.querySelector(".popup_type_image");
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");

  popupImage.src = src;
  popupImage.alt = caption;
  popupCaption.textContent = caption;
  openModal(popupImageModal);
}
