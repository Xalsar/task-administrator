import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TaskForm from "../TaskForm/TaskForm";

import useTasksList from "./hooks/us-tasksList";

import classes from "./TasksList.module.scss";

const TasksList = () => {
  const {
    // CREATE TASK MODAL
    showCreateTaskModal,
    handleClickToggleCreateTaskModal,
    // TASKS LIST
    tasksList,
  } = useTasksList();

  return (
    <>
      {/* CREATE TASK MODAL */}
      <Modal
        size="lg"
        show={showCreateTaskModal}
        onHide={handleClickToggleCreateTaskModal}
        className="bigModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      {/* MODALS LIST */}
      <Container>
        <Row>
          <Col>
            <Button
              className="mt-3 mb-3"
              onClick={handleClickToggleCreateTaskModal}
            >
              Add a task
            </Button>

            <ListGroup>
              {tasksList.map((task) => (
                <ListGroup.Item className={classes.taskItem}>
                  <div>{task.id}</div>
                  <div>{task.name}</div>
                  <div>Label 1, Label 2, Label 3, Label 4</div>
                  <div>{task.timeSpend}h</div>
                  <div>{task.daysList.length} dias</div>
                  <div>
                    <Button variant="secondary">Edit</Button>
                    <Button variant="secondary">Delete</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TasksList;
