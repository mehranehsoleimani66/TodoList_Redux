import { getAllTodo, addTodo, removeTodo, doTodo } from "./actions.js";

const getAllTodoAction = () => {
  return {
    type: getAllTodo
  
  };
};
const addTodoAction = (title) => {
  return {
    type: addTodo,
    title
  };
};
const removeTodoAction = (id) => {
  return {
    type: removeTodo,
    id
  };
};
const doTodoAction = (id) => {
  return {
    type: doTodo,
    id
  };
};
export { addTodoAction, removeTodoAction, doTodoAction, getAllTodoAction };
