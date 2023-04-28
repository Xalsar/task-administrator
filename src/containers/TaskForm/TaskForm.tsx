import Label from "../../../types/Label";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import useTaskForm from "./hooks/use-taskForm";

const labelsList: Label[] = [
  { id: 1, name: "Label 1" },
  { id: 2, name: "Label 2" },
  { id: 3, name: "Label 3" },
  { id: 4, name: "Label 4" },
  { id: 5, name: "Label 5" },
  { id: 6, name: "Label 6" },
  { id: 7, name: "Label 7" },
  { id: 8, name: "Label 8" },
  { id: 9, name: "Label 9" },
];

const TaskForm = () => {
  const {
    // NAME
    name,
    handleTypeName,
    // TYPE
    type,
    handleTypeType,
    // LABELS
    are3LabelsSelected,
    checkIfLabelSelected,
    handleClickLabel,
    // TIME SPEND
    timeSpend,
    handleTypeTimeSpend,
    // DATES LIST
    dateToAdd,
    handlePickDate,
    datesList,
    handleClickAddDateToList,
    formateDateToString,
  } = useTaskForm();

  return (
    <Form>
      <Container>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="task.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={name}
                onChange={handleTypeName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="task.type">
              <Form.Label>Type</Form.Label>
              <Form.Select value={type} onChange={handleTypeType}>
                <option>Story</option>
                <option>Bug</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="task.spend">
              <Form.Label>Time spend</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                value={timeSpend}
                onChange={handleTypeTimeSpend}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Form.Label>Labels</Form.Label>

            {labelsList.map((label) => {
              const isLabelChecked = checkIfLabelSelected(label.id);

              return (
                <Form.Check
                  key={label.id}
                  type="checkbox"
                  id={`label-${label.id}`}
                  label={label.name}
                  checked={checkIfLabelSelected(label.id)}
                  onChange={() => handleClickLabel(label.id)}
                  disabled={are3LabelsSelected && !isLabelChecked}
                />
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId={`task.date-default`}>
              <Form.Label>Pick a date to add to list</Form.Label>

              <Form.Control
                type="date"
                placeholder=""
                value={dateToAdd}
                onChange={handlePickDate}
              />
            </Form.Group>
            <Button className="mb-3" onClick={handleClickAddDateToList}>
              Add date to list
            </Button>
            <ListGroup className="mb-3">
              {datesList.map((date, key) => (
                <ListGroup.Item key={key}>
                  {formateDateToString(date)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>Submit</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default TaskForm;
