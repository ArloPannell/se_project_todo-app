import Popup from "./Popup.js";
import { validationConfig as formConfig } from "../utils/constants.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFunction }) {
    super({ popupSelector });
    this._submitFunction = submitFunction;
    this._popupForm = this._popupEl.querySelector(formConfig.formSelector);
    this._inputList = this._popupForm.querySelectorAll(
      formConfig.inputSelector
    );
  }

  _getInputValues() {
    const inputValues = {};
    inputValues.id = uuidv4();
    this._inputList.forEach((inputEl) => {
      inputValues[inputEl.name] = inputEl.value;
    });
    return inputValues;
  }

  getForm() {
    return this._popupForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._submitFunction(inputValues);
      this._popupForm.reset();
      this.close();
    });
  }
}
