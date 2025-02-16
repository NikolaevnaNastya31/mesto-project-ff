
export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");

  Object.assign(modal.style, {
    visibility: "visible", 
    opacity: "0",
    transition: "opacity 0.3s ease-in-out", 
  });

  setTimeout(() => {
    modal.style.opacity = "1";
  }, 0); 
  document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
  Object.assign(modal.style, {
    opacity: "0",
    transition: "opacity 0.3s ease-in-out",
  });

  setTimeout(() => {
    modal.style.visibility = "hidden";
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscKeyUp);
  }, 300);
  document.addEventListener("keyup", handleEscKeyUp);
};

export const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};
