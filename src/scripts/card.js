import { cardTemplate, popupDeleteCard } from "./index.js";
import { deleteCardOnServer, toggleLike } from "./api.js";

// Функция создания карточки
export function addCard(
  cardData,
  handleDelete,
  handleLike,
  handleImageClick,
  myId,
  openModal,
  closeModal
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const confirmButton = popupDeleteCard.querySelector(
    ".popup__button_confirm-delete"
  );

  // Заполнение карточки
  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  // Отображаем активный лайк, если пользователь уже лайкал
  if (cardData.likes.some((user) => user._id === myId)) {
    handleLike(likeButton);
  }

  // Обработчик клика по кнопке лайка
  likeButton.addEventListener("click", () => {
    const isLiked = cardData.likes.some((user) => user._id === myId);

    toggleLike(cardData._id, isLiked)
      .then((updatedCard) => {
        cardData.likes.length = 0;
        updatedCard.likes.forEach((user) => cardData.likes.push(user));
        likeCountElement.textContent = cardData.likes.length;

        if (cardData.likes.some((user) => user._id === myId)) {
          handleLike(likeButton);
        } else {
          deleteLike(likeButton);
        }
      })
      .catch((err) =>console.log("Ошибка при обновлении лайка:", err));
  });
  // Обработчик клика по изображению карточки
  imageElement.addEventListener("click", () => {
    handleImageClick(cardData.link, cardData.name);
  });

  // Если карточка принадлежит текущему пользователю — показываем кнопку удаления
  if (cardData.owner._id === myId) {
    deleteButton.addEventListener("click", () => {
      openModal(popupDeleteCard);

      const onConfirmDelete = () => {
        deleteCardOnServer(cardData._id)
          .then(() => {
            //deleteCard->handleDelete
            handleDelete(cardElement);
            closeModal(popupDeleteCard);
          })
          .catch((err) => console.log("Ошибка удаления:", err))
          .finally(() => {
            // Удаляем обработчик события при закрытии попапа
            confirmButton.removeEventListener("click", onConfirmDelete);
          });
      };
      // Функция обработки подтверждения удаления карточки
      confirmButton.addEventListener("click", onConfirmDelete);
    });
  } else {
    handleDelete(deleteButton); 
  }
  return cardElement;
}

// Функция удаления карточки из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция обработки лайка (только визуально)
export function handleLike(likeButton) {
  likeButton.classList.add("card__like-button_is-active");
}
// Функция удаления лайка
export function deleteLike(likeButton) {
  likeButton.classList.remove("card__like-button_is-active");
}
