import {
  initialTodos,
  validationConfig,
  todoConfig,
} from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoPopup = new PopupWithForm({
  popupSelector: todoConfig.addTodoPopup,
  submitFunction: (inputValues) => {
    renderTodo(inputValues);
    newTodoValidator.resetValidation();
    updateAddTodo(!inputValues.completed);
  },
});

addTodoPopup.setEventListeners();

const addTodoButton = document.querySelector(todoConfig.addTodoButton);
const addTodoForm = addTodoPopup.getForm();
const todosList = document.querySelector(todoConfig.todosList);

// functions to update todo counter feature
function updateCompleted(completed) {
  todoCountUpdate.updateCompleted(completed);
}
function updateAddTodo(completed) {
  todoCountUpdate.updateTotal(completed);
}
function updateTodoDeleted(completed) {
  todoCountUpdate.updateCompleted(completed);
  todoCountUpdate.updateTotal(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    todoConfig.todoTemplate,
    updateCompleted,
    updateTodoDeleted
  );
  const todoEl = todo.getView(todoConfig);
  return todoEl;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      renderTodo(item);
    },
  },
  todosList
);

section.renderItems();

const todoCountUpdate = new TodoCounter(
  initialTodos,
  todoConfig.todoCounterSelector
);

const newTodoValidator = new FormValidator(addTodoForm, validationConfig);
newTodoValidator.enableValidation();
