import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  todoConfig,
} from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(todoConfig.addTodoButton);
const addTodoPopup = document.querySelector(todoConfig.addTodoPopup);
const addTodoForm = addTodoPopup.querySelector(todoConfig.addTodoForm);
const addTodoCloseBtn = addTodoPopup.querySelector(todoConfig.addTodoCloseBtn);
const todosList = document.querySelector(todoConfig.todosList);

const openModal = (modal) => {
  modal.classList.add(todoConfig.popupVisible);
};

const closeModal = (modal) => {
  modal.classList.remove(todoConfig.popupVisible);
};

const generateTodo = (data) => {
  const todo = new Todo(data, todoConfig.todoTemplate);
  const todoEl = todo.getView(todoConfig);
  return todoEl;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const id = uuidv4();
  newTodoValidator.resetValidation();

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { id, name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newTodoValidator = new FormValidator(addTodoForm, validationConfig);
newTodoValidator.enableValidation();
