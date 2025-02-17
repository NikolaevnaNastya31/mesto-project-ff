export const openModal = (modal) => {
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
  }, 0); 
  document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  modal.classList.add("popup_is-animated");
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 300); 
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