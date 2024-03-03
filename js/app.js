import {
  addTodo,
  removeTodo,
  doTodo,
  filterAllTodos,
  filterCompletedTodos,
  filterIncompletedTodos
} from "../Redux/actions.js";
import { addTodoAction, removeTodoAction } from "../Redux/actionCreatores.js";
const inputEle = document.querySelector(".todo-input");
const addBtn = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todo-list");

window.removeHandler = removeHandler;

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
      const copyState = [...state];
      const newState = copyState.filter((todo) => todo.id !== action.id);
      return newState;
    }
    case doTodo: {
      return state;
    }
    case filterAllTodos: {
      return state;
    }
    case filterCompletedTodos: {
      return state;
    }
    case filterIncompletedTodos: {
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
  console.log(todos);
});

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
     <div class="todo">
        <li class="todo-item">${todo.title}</li>
        <button class="complete-btn">
          <i class="fas fa-check-circle"></i>
        </button>
        <button class='trash-btn' onclick=removeHandler("${todo.id}")>
          <i class="fas fa-trash"></i>
        </button>
      </div>
      `
    );
  });
};
