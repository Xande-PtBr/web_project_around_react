export default class FormValidator {
  constructor(config) {
    this.config = config;
    this.inputs = [];
    this.inputs = document
      .querySelector(this.config.formSelector)
      .querySelectorAll(this.config.inputSelector);
    this.button = document
      .querySelector(this.config.formSelector)
      .querySelector(this.config.submitButtonSelector);
  }

  validateInput(input) {
    const isValid = input.checkValidity();

    if (!isValid) {
      input.classList.add(this.config.inputErrorClass);
      const errorElement = input.form.querySelector(`#${input.id}-error`);
      errorElement.classList.add(this.config.errorClass);
      errorElement.textContent = input.validationMessage;
    } else {
      input.classList.remove(this.config.inputErrorClass);
      const errorElement = input.form.querySelector(`#${input.id}-error`);
      errorElement.classList.remove(this.config.errorClass);
      errorElement.textContent = "";
    }
  }

  toggleButtonState(isValid) {
    if (isValid) {
      this.button.disabled = false;
      this.button.classList.remove(this.config.inactiveButtonClass);
    } else {
      this.button.disabled = true;

      this.button.classList.add(this.config.inactiveButtonClass);
    }
  }

  validateForm(form) {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.validateInput(input);
        this.checkValiditybutton();
      });
    });
  }

  checkValiditybutton() {
    const isValid = Array.from(this.inputs).every((input) =>
      input.checkValidity()
    );

    this.toggleButtonState(isValid);
  }

  enableValidation() {
    this.validateForm(this.config.formSelector);
  }
}
