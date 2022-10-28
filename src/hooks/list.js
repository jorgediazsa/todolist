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
    body: JSON.stringify(todoBuilder({ title: todo })),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function useDoneTodo(todo) {
  return fetch(`${baseUrl}todos/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...todo,
      complete: true,
      completedOn: Date.now(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export { useTodoList, useAddTodo, useDoneTodo };
