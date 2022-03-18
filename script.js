//SELECT  ELEMENT
const theme = document.querySelector("#theme");
const inputText = document.querySelector("#input-task");
const todoList = document.querySelector(".todolist-container");
const itemsLeft = document.querySelector(".item-count");
const clearCompleted = document.querySelector(".clear-completed");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodosFromLocal);
theme.addEventListener("click", changeTheme);

//addTask Eventlistener
inputText.addEventListener("keypress", (e) => {
  if (e.charCode === 13 && inputText.value.length > 0) {
    addTask(inputText.value);
    inputText.value = "";
  }
});
//removeTask Eventlistener
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-todo-item")) {
    removeTask(event.target.parentElement);
  }
});

clearCompleted.addEventListener("click", removeAllCompleted);

//change theme
function changeTheme() {
  document.querySelector("body").classList = theme.checked
    ? "light-mode"
    : "dark-mode";
}

// Items hinzufügen
function addTask(text) {
  const elem = document.createElement("div");
  elem.classList.add("todo-container", "draggable");
  elem.setAttribute("draggable", "true");
  elem.innerHTML = `<label> <input type="checkbox"/>
                        <span class="checkmark"></span>
                        <span class="text">${text}</span></label> 
                        <button class="remove-todo-item"></button>`;

  todoList.append(elem);

  saveTodosToLocal(text);
  updateItemCount(1);
}

//items entfernen
function removeTask(element) {
  removeFromLocal(element);
  element.remove();
  updateItemCount(-1);
}

//-------------------------------
//übrige items zählen
function updateItemCount(num) {
  if (num === 1) {
    itemsLeft.innerText++;
  } else if (num === -1) {
    itemsLeft.innerText--;
  }
}
// --------------------- LocalStorge
//Items in Storage eingügen
function saveTodosToLocal(text) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//Items suchen und anzeigen aus Localstorage
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
//Items aus Sorage löschen
function removeFromLocal(element) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const elemTobeRemoved = element.children[0].children[2].innerText;
  todos.splice(todos.indexOf(elemTobeRemoved), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
