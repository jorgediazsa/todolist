import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useDeleteTodo, useEditTodo, useTodoList } from "hooks/list.js";
import { Alert, ListGroup, Badge, Row, Col } from "react-bootstrap";
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import AddItem from "./AddItem.jsx";

function Todo({ todo }) {
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = () => setEditMode(false);

  if (editMode) {
    return <AddItem todo={todo} onSubmit={handleSubmit} />;
  }

  return <h6 onClick={() => setEditMode(true)}>{todo.title}</h6>;
}

function List() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: todos = [],
    error,
  } = useQuery(["todos"], useTodoList);

  const { mutate: editTodo } = useMutation(useEditTodo, {
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
                onClick={() =>
                  editTodo({ ...todo, complete: true, completedOn: Date.now() })
                }
                bg="light"
                text="dark"
                pill
                style={{ cursor: "pointer" }}
              >
                <BsFillCheckCircleFill />
              </Badge>
            </Col>
            <Col sm={10}>
              <Todo todo={todo} />
            </Col>
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
