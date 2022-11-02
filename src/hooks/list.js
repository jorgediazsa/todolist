import { todoBuilder } from "utils/list";

const baseUrl = "http://localhost:3000/";

function useTodoList() {
  return fetch(`${baseUrl}todos?complete=false`, { method: "GET" }).then(
    (res) => res.json()
  );
}

function useAddTodo(todo) {
  return fetch(`${baseUrl}todos`, {
    method: "POST",
    body: JSON.stringify(todoBuilder(todo)),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function useEditTodo(todo) {
  return fetch(`${baseUrl}todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...todo,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function useDeleteTodo(todo) {
  return fetch(`${baseUrl}todos/${todo.id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export { useTodoList, useAddTodo, useEditTodo, useDeleteTodo };
