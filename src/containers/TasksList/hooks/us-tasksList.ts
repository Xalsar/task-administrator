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

  const handleClickToggleCreateTaskModal = () =>
    setShowCreateTaskModal((prev) => !prev);

  const createTaskAndCloseModal = (taskToAdd: TaskDataToSave) => {
    setTasksList((prev) => [...prev, { id: tasksList.length, ...taskToAdd }]);
    setShowCreateTaskModal(false);
  };

  return {
    // CREATE TASK MODAL
    showCreateTaskModal,
    handleClickToggleCreateTaskModal,
    // TASKS LIST
    tasksList,
    createTaskAndCloseModal,
  };
};

export default useTasksList;
