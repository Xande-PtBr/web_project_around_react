import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector, formSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popupSelector = popupSelector;
    this._formElement = document.querySelector(formSelector);
  }

  _getInputValues() {
    const inputs = Array.from(this._formElement.querySelectorAll("input"));
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }
}
