export default class PopupWithForm extends Popup {
  constructor(popupSelector, sbtFunction) {
    this._popupSelector = popupSelector;
    this._sbtFunction = sbtFunction;
  }
  _getInputValues() {}
  setEventListteners() {
    //overrides parent class, handles submit event, also calls parent function

    super.setEventListteners();
  }
}
