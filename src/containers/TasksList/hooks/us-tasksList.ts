import TaskDataToSave from "../../../../types/TaskDataToSave";
import Task from "../../../../types/Task";

import { useState } from "react";

const demoTasksLists = [
  {
    id: 1,
    name: "Hi I am a task",
    type: "bug",
    labels: [1, 2, 3],
    timeSpend: 25,
    daysList: [
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
    ],
  },
  {
    id: 2,
    name: "Hi I am a task 2",
    type: "bug",
    labels: [1, 2, 3],
    timeSpend: 25,
    daysList: [
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
    ],
  },
  {
    id: 3,
    name: "Hi I am a task 2",
    type: "bug",
    labels: [1, 2, 3],
    timeSpend: 25,
    daysList: [
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
    ],
  },
];

const useTasksList = () => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tasksList, setTasksList] = useState<Task[]>(demoTasksLists);
  const [taskIdToEdit, setTaskIdToEdit] = useState<number | undefined>();

  // CREATE TASK
  const handleClickOpenCreateTaskModal = () => setShowCreateTaskModal(true);
  const handleClickCloseCreateTaskModal = () => setShowCreateTaskModal(false);

  const createTaskAndCloseModal = (taskToAdd: TaskDataToSave) => {
    setTasksList((prev) => [...prev, { id: tasksList.length, ...taskToAdd }]);
    setShowCreateTaskModal(false);
  };

  // REMOVE TASK
  const handleClickRemoveTask = (taskId: Number) => {
    setTasksList((prev) => prev.filter((task) => task.id !== taskId));
  };

  // EDIT TASK
  const taskToEdit = tasksList.find((task) => task.id === taskIdToEdit);
  const showEditTaskModal = !!taskToEdit;
  const closeEditTaskModal = () => setTaskIdToEdit(undefined);
  const handleClickCloseEditTaskModal = closeEditTaskModal;

  const handleClickEditTask = (taskId: number) => {
    setTaskIdToEdit(taskId);
  };

  const saveEditTask = (updatedTaskValues: TaskDataToSave) => {
    setTasksList((prev) =>
      prev.map((task) => {
        if (task.id === taskIdToEdit) {
          return { ...task, ...updatedTaskValues };
        }

        return task;
      })
    );
    closeEditTaskModal();
  };

  return {
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
  };
};

export default useTasksList;
