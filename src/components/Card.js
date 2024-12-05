export default class Card {
  constructor(
    cardData,
    templateCard,
    handleCardClick,
    handleCardLike,
    openDeleteConfirmation,
    userId
  ) {
    this._cardData = cardData;
    this._templateCard = templateCard;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._openDeleteConfirmation = openDeleteConfirmation;
    this._userId = userId;
  }

  _getTemplate() {
    const cardsTemplate = document.querySelector(this._templateCard);

    const cardElement = cardsTemplate.content
      .querySelector(".elements__box")
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._likeButton();
    this._remove();
  }

  _likeButton() {
    this._liked = this._cardData.isLiked;

    //---------------------Botao de curtir----------------
    this._likeButtonElement = this._element.querySelector(".elements__like");
    if (this._liked) {
      this._likeButtonElement.setAttribute("src", "../src/images/liked.png");
    } else {
      this._likeButtonElement.setAttribute("src", "../src/images/like.png");
    }

    // Função para alternar o estado do like
    this._likeButtonElement.addEventListener("click", () => {
      if (
        this._likeButtonElement.getAttribute("src") ===
        "../src/images/liked.png"
      ) {
        this._handleCardLike(this._cardData._id, true);
        return this._likeButtonElement.setAttribute(
          "src",
          "../src/images/like.png"
        );
      }

      this._handleCardLike(this._cardData._id, false);

      this._liked = !this._liked;
      return this._likeButtonElement.setAttribute(
        "src",
        "../src/images/liked.png"
      );
    });
  }

  _remove() {
    const trashCard = this._element.querySelector(".elements__trash");
    const cardUserId = this._cardData.owner._id; // Id do dono do card

    if (this._userId !== cardUserId) {
      // Verifica se o usuário logado é o dono do card para mostrar o botão da lixeira
      // mostra o botão da lixeira
      trashCard.style.display = "block"; // Mostra o botão lixeira
    } else {
      // oculta o botão da lixeira
      return (trashCard.style.display = "none");
    }
    //---------------------Botao Lixeira-----------------

    trashCard.addEventListener("click", () => {
      this._openDeleteConfirmation(this._element, this._cardData._id);
    });
  }

  //
  generateCard() {
    // Armazena a marcação no campo privado _element
    // para que outros elementos possam acessá-lo
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".elements__image");
    const cardTitle = this._element.querySelector(".elements__title");

    cardImage.setAttribute("src", this._cardData.link);
    cardImage.setAttribute("alt", this._cardData.name);
    cardTitle.textContent = this._cardData.name;
    cardImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._cardData.name,
        link: this._cardData.link,
      });
    });

    // Retorna o elemento
    this._setEventListeners();
    return this._element;
  }
}
