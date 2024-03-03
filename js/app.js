import { addTodo, removeTodo, doTodo, getAllTodo } from "../Redux/actions.js";
import {
  addTodoAction,
  doTodoAction,
  removeTodoAction,
  getAllTodoAction
} from "../Redux/actionCreatores.js";

const inputEle = document.querySelector(".todo-input");
const addBtn = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todo-list");
const todoFilterElm = document.querySelector(".filter-todo");

window.removeHandler = removeHandler;
window.todohandler = todohandler;
const todoReducer = (state = [], action) => {
  switch (action.type) {
    case addTodo: {
      let newState = [...state];
      let newObj = {
        id: crypto.randomUUID(),
        title: action.title,
        isCompleted: false
      };
      newState.push(newObj);
      return newState;
    }
    case removeTodo: {
      let copyState = [...state];
      let newState = copyState.filter((todo) => todo.id !== action.id);
      return newState;
    }
    case doTodo: {
      let newState = [...state];
      newState.some((todo) => {
        if (todo.id === action.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
      return newState;
    }
    case getAllTodo: {
      return state;
    }

    default: {
      return state;
    }
  }
};

const store = Redux.createStore(todoReducer);
console.log(store);

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newTitle = inputEle.value.trim();
  store.dispatch(addTodoAction(newTitle));
  const todos = store.getState();
  showOnDom(todos);
  inputEle.value = "";
  console.log(todos);
});

todoFilterElm.addEventListener("change", (e) => {
  store.dispatch(getAllTodoAction());
  let todos = store.getState();
  if (e.target.value === "all") {
    showOnDom(todos);
  } else if (e.target.value === "completed") {
    let completedTodos = todos.filter((todo) => todo.isCompleted);
    showOnDom(completedTodos);
  } else if (e.target.value === "incomplete") {
    let incompletedTodos = todos.filter((todo) => !todo.isCompleted);
    showOnDom(incompletedTodos);
  }
});

function todohandler(id) {
  console.log(id);
  store.dispatch(doTodoAction(id));
  const todos = store.getState();
  showOnDom(todos);
  console.log(todos);
}

function removeHandler(id) {
  store.dispatch(removeTodoAction(id));
  const todos = store.getState();
  showOnDom(todos);
}

const showOnDom = (todos) => {
  todosContainer.innerHTML = "";
  todos.forEach((todo) => {
    todosContainer.insertAdjacentHTML(
      "beforeend",
      `
     <div class="todo ${todo.isCompleted && "completed"}" >
        <li class="todo-item">${todo.title}</li>
        <button class="complete-btn"onclick=todohandler("${todo.id}")>
          <i class="fas fa-check-circle" ></i>
        </button>
        <button class='trash-btn' onclick=removeHandler("${todo.id}")>
          <i class="fas fa-trash"></i>
        </button>
      </div>
      `
    );
  });
};
