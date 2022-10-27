import { useQuery } from "@tanstack/react-query";
import { useTodoList } from "hooks/list.js";
import { Alert, ListGroup } from "react-bootstrap";

function List() {
  const {
    isLoading,
    data: todos = [],
    error,
  } = useQuery(["todos"], useTodoList);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (todos.length === 0) {
    return <Alert variant="info">There is no todos yet</Alert>;
  }

  return (
    <ListGroup>
      {todos.map((todo, key) => (
        <ListGroup.Item key={key}>{todo.title}</ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;
