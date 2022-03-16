//SELECT DOM ELEMENT
const theme = document.querySelector("#theme");
const inputText = document.querySelector("#input-task");
const todoList = document.querySelector(".todolist-container");
const itemsLeft = document.querySelector(".item-count");
const clearCompleted = document.querySelector(".clear-completed");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodosFromLocal);
theme.addEventListener("click", changeTheme);

inputText.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && inputText.value.length > 0) {
    addTask(inputText.value);
    inputText.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-todo-item")) {
    removeTask(event.target.parentElement);
  }
});

clearCompleted.addEventListener("click", removeAllCompleted);

//FUNCTIONS
//change theme
function changeTheme() {
  document.querySelector("body").classList = theme.checked
    ? "light-mode"
    : "dark-mode";
}

//remove task
function removeTask(element) {
  removeFromLocal(element);
  element.remove();
  updateItemCount(-1);
}
//get & render todos from localstorage
function getTodosFromLocal() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const elem = document.createElement("div");
    elem.classList.add("todo-container", "draggable");
    elem.setAttribute("draggable", "true");
    elem.innerHTML = `<label> <input type="checkbox" />
                      <span class="checkmark"></span>
                      <span class="text">${todo}</span></label> 
                      <button class="remove-todo-item"></button>`;

    todoList.append(elem);
    updateItemCount(1);
  });
}
