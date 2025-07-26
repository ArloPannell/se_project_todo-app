class FormValidator {
  constructor(formEl, settings) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _showInputError(inputEl) {
    const errorElementId = `#${inputEl.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputEl.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputEl.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputEl) {
    const errorElementId = `#${inputEl.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._formEl.reset();
    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
} // end class

export default FormValidator;
