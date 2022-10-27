import { Container, Row, Col, Table } from "react-bootstrap";
import AddItem from "components/AddItem.jsx";
import List from "components/List.jsx";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Todo List</h1>
        </Col>
      </Row>
      <AddItem />
      <List />
    </Container>
  );
}

export default App;
