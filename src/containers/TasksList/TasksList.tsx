import Task from "../../../types/Task";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

import useTasksList from "./hooks/use-tasksList";

import classes from "./TasksList.module.scss";

type Props = {
  startingTasks: Task[];
};

const TasksList = ({ startingTasks }: Props) => {
  const {
    areTasksToDisplay,
    // CREATE TASK MODAL
    showCreateTaskModal,
    handleClickOpenCreateTaskModal,
    handleClickCloseCreateTaskModal,
    // TASKS LIST
    tasksList,
    createTaskAndCloseModal,
    // REMOVE
    handleClickRemoveTask,
    // EDIT
    taskToEdit,
    handleClickEditTask,
    showEditTaskModal,
    handleClickCloseEditTaskModal,
    saveEditTask,
    // DISPLAY TASKS
    getLabelNamesFromIds,
    // DOWNLOAD
    handleClickDownloadTasks,
    // UPLOAD FILE
    handleUploadFile,
  } = useTasksList(startingTasks);

  return (
    <>
      {/* CREATE TASK MODAL */}
      <CreateTaskModal
        show={showCreateTaskModal}
        handleClickClose={handleClickCloseCreateTaskModal}
        save={createTaskAndCloseModal}
      />

      <EditTaskModal
        show={showEditTaskModal}
        handleClickClose={handleClickCloseEditTaskModal}
        taskToEdit={taskToEdit}
        save={saveEditTask}
      />

      {/* MODALS LIST */}
      <Container>
        <Row>
          <Col>
            <Button
              className="mt-3 mb-3"
              onClick={handleClickOpenCreateTaskModal}
            >
              Add a task
            </Button>
            <Button className="mx-3" onClick={handleClickDownloadTasks}>
              Download current tasks (JSON)
            </Button>
            <label htmlFor="filesInput">Upload tasks (JSON)</label>
            <input
              id="filesInput"
              type="file"
              onChange={handleUploadFile}
              className={classes.uploadFileInput}
            />

            {areTasksToDisplay ? (
              <ListGroup>
                {tasksList.map((task: Task, index: number) => (
                  <ListGroup.Item className={classes.taskItem} key={index}>
                    <div>{task.name}</div>
                    <div>{task.type}</div>
                    <div>{getLabelNamesFromIds(task.labels).join(", ")}</div>
                    <div>{task.timeSpend} h</div>
                    <div>{task.daysList.length} days</div>
                    <div>
                      <Button
                        variant="secondary"
                        onClick={() => handleClickEditTask(task.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleClickRemoveTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert>
                There are no tasks to show. Add one by clicking &quot;Add a
                task&quot;
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TasksList;
