import labels from "../../../../data/labels.json";

import { useState } from "react";

import TaskDataToSave from "../../../../types/TaskDataToSave";
import Task from "../../../../types/Task";

import axios from "axios";

const useTasksList = (startingTasks: Task[]) => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [tasksList, setTasksList] = useState<Task[]>(startingTasks);
  const [taskIdToEdit, setTaskIdToEdit] = useState<number | undefined>();

  // CREATE TASK
  const handleClickOpenCreateTaskModal = () => setShowCreateTaskModal(true);
  const handleClickCloseCreateTaskModal = () => setShowCreateTaskModal(false);

  const createTaskAndCloseModal = async (taskToAdd: TaskDataToSave) => {
    try {
      const createdTaskResponse = await axios.post(
        "http://localhost:3000/api/tasks/add",
        taskToAdd
      );

      const createdTask = createdTaskResponse.data;

      setTasksList((prev) => [...prev, createdTask]);
      setShowCreateTaskModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE TASK
  const handleClickRemoveTask = async (taskId: Number) => {
    try {
      await axios.delete("http://localhost:3000/api/tasks/delete?id=" + taskId);

      setTasksList((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT TASK
  const taskToEdit = tasksList.find((task) => task.id === taskIdToEdit);
  const showEditTaskModal = !!taskToEdit;
  const closeEditTaskModal = () => setTaskIdToEdit(undefined);
  const handleClickCloseEditTaskModal = closeEditTaskModal;

  const handleClickEditTask = (taskId: number) => {
    setTaskIdToEdit(taskId);
  };

  const saveEditTask = async (updatedTaskValues: TaskDataToSave) => {
    try {
      await axios.put("http://localhost:3000/api/tasks/update", {
        id: taskIdToEdit,
        ...updatedTaskValues,
      });

      setTasksList((prev) =>
        prev.map((task) => {
          if (task.id === taskIdToEdit) {
            return { ...task, ...updatedTaskValues };
          }

          return task;
        })
      );
      closeEditTaskModal();
    } catch (error) {
      console.log(error);
    }
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
  const onReaderLoad = async (event: React.FormEvent<EventTarget>) => {
    try {
      const target: any = event.target as HTMLInputElement;

      const obj = JSON.parse(target.result);

      await axios.post("http://localhost:3000/api/tasks/load", obj);

      setTasksList(obj);
    } catch (error) {
      console.log(error);
    }
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
