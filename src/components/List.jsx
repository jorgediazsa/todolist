import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDoneTodo, useTodoList } from "hooks/list.js";
import { Alert, ListGroup, Form } from "react-bootstrap";

function List() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: todos = [],
    error,
  } = useQuery(["todos"], useTodoList);

  const mutation = useMutation(useDoneTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (todos.length === 0) {
    return <Alert variant="info">There is no todos yet</Alert>;
  }

  const handleComplete = (todo) => mutation.mutate(todo);

  return (
    <ListGroup>
      {todos.map((todo, key) => (
        <ListGroup.Item key={key}>
          <Form.Check
            type="checkbox"
            id={`complete-${key}`}
            onClick={() => handleComplete(todo)}
            label={todo.title}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;
