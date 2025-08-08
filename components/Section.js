export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._rederer = renderer;
    this._containerSelector = containerSelector;
  }
  addItem() {}
  renderItems() {}
}
