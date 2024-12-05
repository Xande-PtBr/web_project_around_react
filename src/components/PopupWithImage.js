import Popup from "./Popup.js";

// ----------------- Classe PopupWithImage ----------------------------
export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._popupImage = this._popup.querySelector(imageSelector);
    this._popupTitle = this._popup.querySelector(titleSelector);
  }
  open(card) {
    //pega as info dos campos
    this._popupImage.setAttribute("src", card.link);
    this._popupImage.setAttribute("Alt", card.name);
    this._popupTitle.textContent = card.name;
    super.open();
  }
}
