import { todoConfig as config } from "../utils/constants.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popupEl = document.querySelector(popupSelector);
  }

  open() {
    this._popupEl.classList.add(config.popupVisible);
    document.addEventListener("keydown", this._handleEscapeClose);
  }

  close() {
    this._popupEl.classList.remove(config.popupVisible);
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  _handleEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupEl.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(config.addTodoCloseBtn.slice(1)) || // remove the "." in the class name from the config button selector
        evt.target.classList.contains(config.popupVisible)
      ) {
        this.close();
      }
    });
  }
}
