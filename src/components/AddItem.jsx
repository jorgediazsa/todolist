import { Form } from "react-bootstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAddTodo } from "../hooks/list.js";

function AddItem() {
  const [todo, setTodo] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation(useAddTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(todo);
    setTodo("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        placeholder="Go to the market"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </Form>
  );
}

export default AddItem;
