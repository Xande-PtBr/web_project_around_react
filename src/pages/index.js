import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
//
//------------------------- Arr de cards ------------------------------------ */
/* const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
]; */
//

//---- lidar com o informacoes de perfil
const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-sobre-mim",
  avatarSelector: ".profile__image",
});

let userId;
let sectionNewCardElement;

api.getAppInfo().then(([userData, cardData]) => {
  //---------pega informações do perfil
  userId = userData._id;
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserAvatar(userData.avatar);
  //---------------pega as cards da API

  sectionNewCardElement = new Section(
    {
      items: cardData,
      renderer: (items) => {
        const card = new Card(
          items,
          "#cards-template",
          (card) => {
            popupWithImage.open(card);
          },

          (cardId, liked) => {
            if (liked) {
              api.deleteLike(cardId);
            } else {
              api.isLiked(cardId);
            }
          },
          (card, cardId) => {
            popupConfirmationDelete.open(card, cardId);
          },
          userId
        );
        sectionNewCardElement.addItem(card.generateCard());
      },
    },
    ".elements"
  );
  sectionNewCardElement.rendererItems();
});

//-------------------------sectionNewCardElement------------------------------------

const buttonSaveAvatar = document.querySelector(".popup__button-save-avatar");
//-------------------------popup profile------------------------------------
const popupEditForm = new PopupWithForm(
  ({ name, about }) => {
    buttonSaveAvatar.textContent = "Salvando...";
    api
      .editUserInfo(name, about)
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
      })
      .finally(() => {
        buttonSaveAvatar.textContent = "Salvar";
      });
  },
  ".popup_edit_profile",
  ".popup__form"
);
popupEditForm.setEventListeners();

//-------------------------popup profile avatar edit------------------------------------
const popupEditAvatarForm = new PopupWithForm(
  ({ avatar }) => {
    buttonSaveAvatar.textContent = "Salvando...";
    userInfo.setUserAvatar(avatar);
    api.profilePictureUpdate(avatar).finally(() => {
      buttonSaveAvatar.textContent = "Salvar";
    });
  },
  ".popup_edit_profile-avatar",
  ".popup__form-edit-avatar"
);

const buttonEditAvatar = document.querySelector(".profile__edit-avatar-button");

buttonEditAvatar.addEventListener("click", function () {
  popupEditAvatarForm.open();
});

popupEditAvatarForm.setEventListeners();

//-------------------------popup image------------------------------------
const popupWithImage = new PopupWithImage(
  ".popup_show-image",
  ".popup__view-image",
  ".popup__title-image"
);

popupWithImage.setEventListeners();

//-------------------------inicio popup Confirmation Delete---------------------------------

const popupConfirmationDelete = new PopupWithConfirmation(
  ".popup__confirmation-delete",
  (card, cardId) => {
    api.deleteCard(cardId);
    card.remove();
  },
  ".popup__form-confirmation-delete"
);

popupConfirmationDelete.setEventListeners();

/*-------------------------Fim popup Confirmation Delete------------------------------------ */

//--------------------------popup-Card------------------------------------

const popupCard = new PopupWithForm(
  ({ name, link }) => {
    api.addNewCard(name, link).then((apiCard) => {
      /*       apiCard = {
        name,
        link,
        _id: apiCard._id,
        likes: apiCard.likes,
        owner: apiCard.owner,
      }; */
      // Lembrete: Explicação desta parte, porque nao é necessario colocar os dados do card no cardInfo

      // nova variavel (newCarData) para criar o novo card (criateCard) com os dados digitado (cardInfo)
      const newCardData = new Card(
        apiCard,
        "#cards-template",
        (card) => popupWithImage.open(card),
        (cardId, liked) => {
          if (liked) {
            api.delete(cardId);
          } else {
            api.isLiked(cardId);
          }
        },
        (card, cardId) => {
          popupConfirmationDelete.open(card, cardId);
        },
        userId
      ).generateCard();
      sectionNewCardElement.addItem(newCardData);
      popupCard.close();
    });
  },
  ".popup__new-cards",
  ".popup__form-card"
);

popupCard.setEventListeners();

//
//
// -------------------------popup profile------------------------------------

const buttonEdit = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".popup__input-name");
const jobInput = document.querySelector(".popup__input-sobre-mim");

buttonEdit.addEventListener("click", function () {
  popupEditForm.open();
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;

  const validate = new FormValidator({
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });

  validate.enableValidation();
});

const buttonClose = document.querySelector(".popup__close");
buttonClose.addEventListener("click", function () {
  popupEditForm.close();
});

/* -------------------------Fim popup-Cards------------------------------------ */

/* const popupCards = document.querySelector(".popup__new-cards"); */
const buttonAddCards = document.querySelector(".profile__add-button");

buttonAddCards.addEventListener("click", function () {
  popupCard.open();
  const validate = new FormValidator({
    formSelector: ".popup__form-card",
    inputSelector: ".popup__input-card-title, .popup__input-card-link-img",
    submitButtonSelector: ".popup__button-new-card",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  validate.checkValiditybutton();
  validate.enableValidation();
});

//-----------fechar popup card ---------------------------------------------
const buttonCloseCard = document.querySelector(".popup__close-card");
buttonCloseCard.addEventListener("click", function () {
  popupCard.close();
});

//-----------fechar popup conformation delete ------------------------------
const buttonCloseConfirmationDelete = document.querySelector(
  ".popup__close-delete"
);
buttonCloseConfirmationDelete.addEventListener("click", function () {
  popupConfirmationDelete.close();
});

//-----------fechar popup Edit Avatar ------------------------------
const buttonClosePopupAvatar = document.querySelector(
  ".popup__close-edit-avatar"
);
buttonClosePopupAvatar.addEventListener("click", function () {
  popupEditAvatarForm.close();
});

// Fecha o popup de imagem zoom
const buttonCloseImage = document.querySelector(".popup__close-image");
buttonCloseImage.addEventListener("click", function () {
  popupWithImage.close();
});

/*-----------------------------------------------------------*/
