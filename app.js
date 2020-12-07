//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
let todos;

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function getAndAddTodo(ev) {
  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = ev;
  todoDiv.appendChild(newTodo);
  //CHECK MARk BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND To LIST
  todoList.appendChild(todoDiv);
}
function addTodo(event) {
  //Prevent Form From Submitting
  event.preventDefault();
  if (todoInput.value !== "") {
    getAndAddTodo(todoInput.value);
    //ADD todo to localstorage
    saveLocalTodos(todoInput.value);
    //Clear Todo Input Value
    todoInput.value = null;
  }
}
function deleteCheck(e) {
  const item = e.target;
  //Delete Todo
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //Check mark todo
  if (item.classList[0] == "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.diplay = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.diplay = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        return;
    }
  });
}
function checkLocalStorage() {
  //CHECK----HEY do i already have thing in there ?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
function saveLocalTodos(todo) {
  checkLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  checkLocalStorage();
  todos.forEach(function (todo) {
    getAndAddTodo(todo);
  });
}
function removeLocalTodos(todo) {
  checkLocalStorage();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
