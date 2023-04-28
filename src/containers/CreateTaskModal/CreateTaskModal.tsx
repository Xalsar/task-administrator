import TaskDataToSave from "../../../types/TaskDataToSave";

import Modal from "react-bootstrap/Modal";

import TaskForm from "../TaskForm/TaskForm";

type Props = {
  show: boolean;
  handleClickClose: () => void;
  save: (data: TaskDataToSave) => void;
};

const CreateTaskModal = ({ show, handleClickClose, save }: Props) => {
  return (
    <Modal size="lg" show={show} onHide={handleClickClose} className="bigModal">
      <Modal.Header closeButton>
        <Modal.Title>Create a task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskForm save={save} />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
