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

//change theme
function changeTheme() {
  document.querySelector("body").classList = theme.checked
    ? "light-mode"
    : "dark-mode";
}

//add task
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

//remove task
function removeTask(element) {
  removeFromLocal(element);
  element.remove();
  updateItemCount(-1);
}

//calculate items left count
function updateItemCount(num) {
  if (num === 1) {
    itemsLeft.innerText++;
  } else if (num === -1) {
    itemsLeft.innerText--;
  }
}

//filter list
document.querySelectorAll(".filters input").forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.id);
    filterTodoList(e.target.id);
  });
});

function filterTodoList(id) {
  const list = document.querySelectorAll(".todo-container");
  switch (id) {
    case "all":
      list.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      list.forEach((item) => {
        if (item.querySelector("input").checked) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });
      break;
    case "completed":
      list.forEach((item) => {
        if (!item.querySelector("input").checked) {
          item.classList.add("hidden");
        } else {
          item.classList.remove("hidden");
        }
      });
      break;
  }
}

//clear all completed tasks
function removeAllCompleted() {
  document
    .querySelectorAll('.todo-container input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTask(item.closest("div"));
    });
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

//Zusatz

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  saveThemeToLocalStorage("darkmode");
} else {
  document.querySelector("body").classList.add("light-mode");
  document.querySelector("body").classList.remove("dark-mode");
  saveThemeToLocalStorage("lightmode");
}

function saveThemeToLocalStorage(modetheme) {
  if (localStorage.getItem("modetheme") === null) {
    modetheme = modetheme;
  } else {
    modetheme = JSON.parse(localStorage.getItem("modetheme"));
  }
  localStorage.setItem("modetheme", JSON.stringify(modetheme));
}

//FUNKTION ONLOAD DAMIT STORAGE gelesen wird!
