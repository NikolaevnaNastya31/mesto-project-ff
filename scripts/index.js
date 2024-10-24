// // @todo: Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeList = document.querySelector('.places__list');

// @todo: Функция создания карточки
 function addCard(cardData){
     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
     
     cardElement.querySelector('.card__title').textContent = cardData.name;
     cardElement.querySelector('.card__image').src = cardData.link;
     cardElement.querySelector('.card__image').alt = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');  
     deleteButton.addEventListener('click', function () {
         cardElement.remove()
     });     
        
    return cardElement;
}
// @todo: Функция удаления карточки
 function deleteCard(cardElement){
     cardElement.remove();
 }

// @todo: Вывести карточки на страницу

initialCards.forEach(function (i) {
    const cardList = addCard(i);
    placeList.append(cardList);
})