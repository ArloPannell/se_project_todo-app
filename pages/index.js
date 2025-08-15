import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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

const addTodoButton = document.querySelector(todoConfig.addTodoButton);
const TodoPopup = document.querySelector(todoConfig.addTodoPopup);
const addTodoForm = TodoPopup.querySelector(todoConfig.addTodoForm);
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

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todo = new Todo(
        item,
        todoConfig.todoTemplate,
        updateCompleted,
        updateTodoDeleted
      );
      const todoEl = todo.getView(todoConfig);
      todosList.append(todoEl);
    },
  },
  todosList
);

section.renderItems();

const todoCountUpdate = new TodoCounter(initialTodos, ".counter__text");

const newTodoValidator = new FormValidator(addTodoForm, validationConfig);
newTodoValidator.enableValidation();

const addTodoPopup = new PopupWithForm({
  popupSelector: todoConfig.addTodoPopup,
  submitFunction: (inputValues) => {
    section.addItem(generateTodo(inputValues));
    newTodoValidator.enableValidation();
    updateAddTodo(!inputValues.completed);
  },
});

addTodoPopup.setEventListeners();
