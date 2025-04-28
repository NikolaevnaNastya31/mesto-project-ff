export const openModal = (modal) => {
  modal.classList.add("popup_is-animated");

  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 0);

  document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  modal.classList.add("popup_is-animated");

  setTimeout(() => {
    modal.classList.remove("popup_is-animated");
  }, 300);

  document.removeEventListener("keyup", handleEscKeyUp);
};

export const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

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
