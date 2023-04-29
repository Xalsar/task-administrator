import labels from "../../../mockData/labels.json";

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

  // DISPLAY TASKS
  const getLabelNamesFromIds = (labelsIds: number[]) => {
    return labelsIds.map((labelId) => {
      const labelData = labels.find((label) => labelId === label.id);

      return labelData?.name;
    });
  };

  // DOWNLOAD
  const handleClickDownloadTasks = () => {
    const obj = tasksList;
    const data =
      "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    const a = document.createElement("a");
    a.href = "data:" + data;
    a.download = "data.json";
    a.innerHTML = "download JSON";
    a.style.display = "none";

    const container = document.querySelector("body");
    container?.appendChild(a);

    a.click();

    a.remove();
  };

  // UPLOAD FILE
  const onReaderLoad = (event: React.FormEvent<EventTarget>) => {
    const target: any = event.target as HTMLInputElement;

    const obj = JSON.parse(target.result);
    setTasksList(obj);
  };

  const handleUploadFile = (event: any) => {
    const reader: any = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
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
    // DISPLAY TASKS
    getLabelNamesFromIds,
    // DOWNLOAD
    handleClickDownloadTasks,
    // UPLOAD FILE
    handleUploadFile,
  };
};

export default useTasksList;
