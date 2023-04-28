import { useState } from "react";

const demoTasksLists = [
  {
    id: 1,
    name: "Hi I am a task",
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
  const [tasksList, setTasksList] = useState(demoTasksLists);

  const handleClickToggleCreateTaskModal = () =>
    setShowCreateTaskModal((prev) => !prev);

  return {
    // CREATE TASK MODAL
    showCreateTaskModal,
    handleClickToggleCreateTaskModal,
    // TASKS LIST
    tasksList,
  };
};

export default useTasksList;
