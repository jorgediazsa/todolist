const baseUrl = "http://localhost:3000/";

function useTodoList() {
  return fetch(`${baseUrl}todos`, { method: "GET" }).then((res) => res.json());
}

function useAddTodo(todo) {
  return fetch(`${baseUrl}todos`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export { useTodoList, useAddTodo };
