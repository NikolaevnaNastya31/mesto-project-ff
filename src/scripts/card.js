import { cardTemplate } from "./index.js";

// @todo: Функция создания карточки
export function addCard(cardData, handleDelete, handleLike, handleImageClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");

  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    handleDelete(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    handleLike(likeButton);
  });

  imageElement.addEventListener("click", () => {
    handleImageClick(cardData.link, cardData.name);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

export function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
