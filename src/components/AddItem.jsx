import { Form } from "react-bootstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";

import { useAddTodo, useEditTodo } from "../hooks/list.js";

function AddItem({ todo = {}, onSubmit }) {
  const [title, setTitle] = useState(todo.title ?? "");

  const queryClient = useQueryClient();

  const mutation = useMutation(isEmpty(todo) ? useAddTodo : useEditTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ ...todo, title });
    setTitle("");
    if (onSubmit) {
      onSubmit();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        placeholder="Go to the market"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Form>
  );
}

export default AddItem;
