class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateEl = document.querySelector(selector);
  }

  _setEventListeners(todoConfig) {
    const todoDeleteBtn = this._todoEl.querySelector(todoConfig.todoDeleteBtn);

    todoDeleteBtn.addEventListener("click", () => {
      this._todoEl.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckbox(todoConfig) {
    this._todoCheckboxEl = this._todoEl.querySelector(
      todoConfig.todoCheckboxEl
    );
    const todoLabel = this._todoEl.querySelector(todoConfig.todoLabel);
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDate(todoConfig) {
    const todoDate = this._todoEl.querySelector(todoConfig.todoDate);
    // If a due date has been set, parsing this it with `new Date` will return a
    // number. If so, we display a string version of the due date in the todo.
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView(todoConfig) {
    this._todoEl = this._templateEl.content
      .querySelector(todoConfig.todoSelector)
      .cloneNode(true);
    const todoNameEl = this._todoEl.querySelector(todoConfig.todoNameEl);
    todoNameEl.textContent = this._data.name;
    this._generateCheckbox(todoConfig);
    this._generateDate(todoConfig);
    this._setEventListeners(todoConfig);

    return this._todoEl;
  }
} // end class

export default Todo;
