import { deleteCardOnServer, toggleLike } from "./api.js";

// Функция создания карточки
export function createCard({
  cardData,
  handleDelete,
  handleImageClick,
  myId,
  openModal,
  closeModal,
  cardTemplate,
  popupDeleteCard,
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const titleElement = cardElement.querySelector(".card__title");
  const imageElement = cardElement.querySelector(".card__image");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const confirmButton = popupDeleteCard.querySelector(
    ".popup__button_confirm-delete"
  );

  const isLikedByMe = (user) => user._id === myId;

  // Функция обновления состояния лайка и счетчика
  function updateLikeState(updatedLikes) {
    cardData.likes = updatedLikes;
    likeCountElement.textContent = updatedLikes.length;

    const isLiked = updatedLikes.some(isLikedByMe);
    setLikeState(likeButton, isLiked);
  }

  // Установка данных карточки
  titleElement.textContent = cardData.name;
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;

  updateLikeState(cardData.likes);

  // Обработчик клика по лайку
  likeButton.addEventListener("click", () => {
    const isLikedNow = cardData.likes.some(isLikedByMe);

    toggleLike(cardData._id, isLikedNow)
      .then((updatedCard) => {
        updateLikeState(updatedCard.likes);
      })
      .catch((err) => console.log("Ошибка при обновлении лайка:", err));
  });

  // Обработчик клика по изображению
  imageElement.addEventListener("click", () => {
    handleImageClick(cardData.link, cardData.name);
  });

  // Если карточка принадлежит текущему пользователю
  if (cardData.owner._id === myId) {
    deleteButton.addEventListener("click", () => {
      openModal(popupDeleteCard);

      const onConfirmDelete = () => {
        deleteCardOnServer(cardData._id)
          .then(() => {
            handleDelete(cardElement);
            closeModal(popupDeleteCard);
          })
          .catch((err) => console.log("Ошибка удаления:", err))
          .finally(() => {
            confirmButton.removeEventListener("click", onConfirmDelete);
          });
      };

      confirmButton.addEventListener("click", onConfirmDelete);
    });
  } else {
    handleDelete(deleteButton); // Прячем кнопку удаления для чужих карточек
  }

  return cardElement;
}

// Удаление карточки из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}
// Обновление состояния лайка
function setLikeState(button, liked) {
  if (liked) {
    button.classList.add("card__like-button_is-active");
  } else {
    button.classList.remove("card__like-button_is-active");
  }
}
