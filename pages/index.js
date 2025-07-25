import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import {
  initialTodos,
  validationConfig,
  todoConfig,
} from "../utils/constants.js";

import Todo from "../components/Todo.js";

const addTodoButton = document.querySelector(todoConfig.addTodoButton);
const addTodoPopup = document.querySelector(todoConfig.addTodoPopup);
const addTodoForm = addTodoPopup.querySelector(todoConfig.addTodoForm);
const addTodoCloseBtn = addTodoPopup.querySelector(todoConfig.addTodoCloseBtn);
const todoTemplate = document.querySelector(todoConfig.todoTemplate);
const todosList = document.querySelector(todoConfig.todosList);

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
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

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const values = { name, date };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
