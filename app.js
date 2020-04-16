// SELECTORS

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterAll = document.querySelector(".filter-all")
const filterCompleted = document.querySelector(".filter-completed")
const filterIncomplete = document.querySelector(".filter-incomplete")


// EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterAll.addEventListener("click", filterTodos);
filterCompleted.addEventListener("click", filterTodos);
filterIncomplete.addEventListener("click", filterTodos);


// FUNCTIONS
function addTodo(event) {
  event.preventDefault();
  // Create Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Add Todo to Local Storage

  // saveTodosLocal(todoInput.value);
  // Checkmark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-button");
  todoDiv.appendChild(completedButton);
  // Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);
  // Append todoDiv to todoList
  todoList.appendChild(todoDiv);
  // Clear todoInput Value
  todoInput.value = "";
}

function deleteAndCheck(e) {
  console.log("e.target is ", e.target)
  item = e.target;
  // Delete Todo
  if (item.classList[0] === 'trash-button') {
    const todo = item.parentElement;
    todo.classList.add("falling")
    // Special event listener
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })
    // todo.remove()
  }
  // Check off Todo
  if (item.classList[0] === 'completed-button') {
    todo = item.parentElement;
    todo.classList.toggle("completed")
  }
}

function filterTodos(e) {
  console.log(e.target)
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        // Add classes to filter buttons
        filterAll.classList.add("select-button");
        filterCompleted.classList.remove("select-button");
        filterIncomplete.classList.remove("select-button");
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        // Filter buttons
        filterCompleted.classList.add("select-button");
        filterAll.classList.remove("select-button");
        filterIncomplete.classList.remove("select-button");
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        // Filter buttons
        filterCompleted.classList.remove("select-button");
        filterAll.classList.remove("select-button");
        filterIncomplete.classList.add("select-button");
    }
  })
}


// function saveTodosLocal(todo) {
//   let todos;
//   console.log(typeof todo)
//   // let todos = storedTodos;
//   console.log("saveTodosLocal is running and todo is ", todo)
//   // Check if already have things in there
//   if (localStorage.getItem("todos") === "null") {
//     todos = [];
//   } else {
//     todos = JSON.parse(localStorage.getItem("todos"));
//   }
//   todos.push(todo);
//   localStorage.setItem("todos", JSON.stringify("todos"))
// }
