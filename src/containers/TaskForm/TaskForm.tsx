import Task from "../../../types/Task";
import Label from "../../../types/Label";
import SaveTask from "../../../types/SaveTask";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

import useTaskForm from "./hooks/use-taskForm";

import classes from "./TaskForm.module.scss";

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

type Props = { save: SaveTask; task?: Task };

const TaskForm = ({ save, task }: Props) => {
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
    handleClickDeleteDate,
    tryedToAddExistingDate,
    isNoDatePicked,
    // SUBMIT FORM
    isValid,
    isFormValid,
    hasSubmittedForm,
    handleSubmitForm,
  } = useTaskForm({ save, taskToEdit: task });

  return (
    <Form onSubmit={handleSubmitForm}>
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
                isValid={hasSubmittedForm && isValid.name}
                isInvalid={hasSubmittedForm && !isValid.name}
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="task.type">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={type}
                onChange={handleTypeType}
                isValid={hasSubmittedForm && isValid.type}
                isInvalid={hasSubmittedForm && !isValid.type}
              >
                <option value="story">Story</option>
                <option value="bug">Bug</option>
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
                isValid={hasSubmittedForm && isValid.timeSpend}
                isInvalid={hasSubmittedForm && !isValid.timeSpend}
              />
              <Form.Control.Feedback type="invalid">
                Time spend is required
              </Form.Control.Feedback>
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
            <Button
              onClick={handleClickAddDateToList}
              disabled={isNoDatePicked}
            >
              Add date to list
            </Button>
            {tryedToAddExistingDate && (
              <Form.Control.Feedback type="invalid" className="d-block">
                There can not be duplicated dates, pick another one
              </Form.Control.Feedback>
            )}
            {datesList.length > 0 ? (
              <ListGroup className={"mt-3 mb-3"}>
                {datesList.map((date, key) => (
                  <ListGroup.Item key={key} className={classes.dateListItem}>
                    {formateDateToString(date)}

                    <Button
                      onClick={() => handleClickDeleteDate(date)}
                      variant="secondary"
                    >
                      Eliminar
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert>
                <p>There are no days in this task </p>
                <hr />
                <p>
                  Use the input above and the button "Add date to list" to add
                  some.
                </p>
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Submit</Button>
            {hasSubmittedForm && !isFormValid && (
              <Form.Control.Feedback type="invalid" className="d-block">
                Form could not be sumbitted, there are errors in the fields
              </Form.Control.Feedback>
            )}
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default TaskForm;
