import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDeleteTodo, useDoneTodo, useTodoList } from "hooks/list.js";
import { Alert, ListGroup, Badge, Row, Col } from "react-bootstrap";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

function List() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: todos = [],
    error,
  } = useQuery(["todos"], useTodoList);

  const { mutate: completeTodo } = useMutation(useDoneTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const { mutate: deleteTodo } = useMutation(useDeleteTodo, {
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (todos.length === 0) {
    return <Alert variant="info">There is no todos yet</Alert>;
  }

  return (
    <ListGroup>
      {todos.map((todo, key) => (
        <ListGroup.Item key={key}>
          <Row>
            <Col sm={1}>
              <Badge
                onClick={() => completeTodo(todo)}
                bg="light"
                text="dark"
                pill
                style={{ cursor: "pointer" }}
              >
                <BsFillCheckCircleFill />
              </Badge>
            </Col>
            <Col sm={10}>{todo.title}</Col>
            <Col sm={1}>
              <Badge
                onClick={() => deleteTodo(todo)}
                bg="light"
                text="dark"
                pill
                style={{ cursor: "pointer" }}
              >
                <BsFillTrashFill />
              </Badge>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default List;
