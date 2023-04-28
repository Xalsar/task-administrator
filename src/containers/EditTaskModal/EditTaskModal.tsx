import Task from "../../../types/Task";
import TaskDataToSave from "../../../types/TaskDataToSave";

import Modal from "react-bootstrap/Modal";

import TaskForm from "../TaskForm/TaskForm";

type Props = {
  show: boolean;
  handleClickClose: () => void;
  save: (data: TaskDataToSave) => void;
  taskToEdit: Task | undefined;
};

const EditTaskModal = ({ show, handleClickClose, save, taskToEdit }: Props) => {
  return (
    <Modal size="lg" show={show} onHide={handleClickClose} className="bigModal">
      <Modal.Header closeButton>
        <Modal.Title>Create a task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskForm save={save} task={taskToEdit} />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
