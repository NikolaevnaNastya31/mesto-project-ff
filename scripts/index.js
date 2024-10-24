// // @todo: Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки
 function addCard(cardData, handleDelete ){
     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
     const titleElement = cardElement.querySelector('.card__title');
     const imageElement = cardElement.querySelector('.card__image');

     titleElement.textContent = cardData.name;
     imageElement.src = cardData.link;
     imageElement.alt = cardData.name;

     const deleteButton = cardElement.querySelector('.card__delete-button');   
     deleteButton.addEventListener('click', function () { 
         handleDelete(cardElement); 
     });      

     return cardElement; 
 }

// @todo: Функция удаления карточки
 function deleteCard(cardElement){
     cardElement.remove();
 }

// @todo: Вывести карточки на страницу

initialCards.forEach(function (i) { 
    const cardList = addCard(i, deleteCard); 
    placeList.append(cardList); 
});