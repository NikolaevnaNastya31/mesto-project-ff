export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    popupButtonDelete: "popup__content_delete",
  };
    // Показываем ошибку
export const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };
  
  // Скрываем ошибку
  export const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
     console.log(inputElement)
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  };
  
  // Проверка символов
  export function hasInvalidSymbols(inputElement) {
    const regex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
    return inputElement.value && !regex.test(inputElement.value);
  }
  
  // Проверка валидации
  export function checkValidation(formElement, inputElement, config) {
    inputElement.setCustomValidity("");
  
    const isPlaceNameInput = inputElement.name === "place-name";
    const isLinkInput = inputElement.name === "link";
    const isAvatarInput = inputElement.name === "link-avatar";

    // Проверка на неправильные символы в названии места
    if (isPlaceNameInput && hasInvalidSymbols(inputElement)) {
      inputElement.setCustomValidity("Разрешены только буквы, дефис и пробелы");
    }

    // Проверка правильности URL в карточке
    if (isLinkInput && inputElement.validity.typeMismatch) {
      inputElement.setCustomValidity("Введите адрес сайта");
    }

  // Проверка правильности URL для аватара
  if (isAvatarInput && inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity("Введите адрес изображения");
  }

    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  // Проверка невалидного поля
  export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };
  
  // Управление кнопкой
  export const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };
  
  // Установка слушателей на форму
  export const setEventListeners = (formElement, config) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkValidation(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
  
      // Проверка при загрузке
      checkValidation(formElement, inputElement, config);
    });
  };
  
  // Сброс ошибок
  export const clearValidation = (formElement, config = validationConfig) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    });
  
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    if (buttonElement && !formElement.closest('.popup_delete_card')) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    }

  };
  // // Функция сброса значений полей формы
  export const resetFormInputs = (formElement) => {
    // Проверяем, что переданный элемент является формой
    if (formElement && formElement.name === "new-place") {
      const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
      inputList.forEach((input) => {
        input.value = ""; // Очищаем значение каждого поля ввода
      });
    }
  };
  
  // Активация валидации на всех формах
  export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, config);
    });
  };

  