import Task from "../../../../types/Task";
import TaskDataToSave from "../../../../types/TaskDataToSave";

import { useState, useEffect } from "react";

import moment from "moment";

import isNumeric from "@/utils/isNumber";

type Props = {
  save: (data: Task | TaskDataToSave) => void;
  taskToEdit: Task | undefined;
};

const useTaskForm = ({ save, taskToEdit }: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("story");
  const [timeSpend, setTimeSpend] = useState("");
  const [labelsListIds, setLabelsListIds] = useState<number[]>([]);

  const [dateToAdd, setDateToAdd] = useState("");
  const [datesList, setDatesList] = useState<Date[]>([]);

  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [hasSubmittedDateForm, setHasSubmittedDateForm] = useState(false);

  const [tryedToAddExistingDate, setTryedToAddExistingDate] = useState(false);

  useEffect(() => {
    if (!taskToEdit) return;

    setName(taskToEdit.name);
    setType(taskToEdit.type);
    setTimeSpend(String(taskToEdit.timeSpend));
    setLabelsListIds(taskToEdit.labels);
    setDatesList(taskToEdit.daysList);
  }, [taskToEdit]);

  //   NAME
  const handleTypeName = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setName(target.value);
  };

  //   TYPE TYPE
  const handleTypeType = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setType(target.value);
  };

  //   TYPE SPEND
  const handleTypeTimeSpend = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setTimeSpend(String(target.value));
  };

  //   LABEL
  const handleClickLabel = (selectedLabelId: number) => {
    const isLabelOnList = labelsListIds.find(
      (labelId) => labelId === selectedLabelId
    );

    if (isLabelOnList) {
      setLabelsListIds((prev) =>
        prev.filter((labelId) => labelId !== selectedLabelId)
      );
    } else {
      setLabelsListIds((prev) => [...prev, selectedLabelId]);
    }
  };

  const checkIfLabelSelected = (labelIdToCheck: number) =>
    !!labelsListIds.find((labelId) => labelIdToCheck === labelId);

  const are3LabelsSelected = labelsListIds.length === 3;

  //   DATES
  const handlePickDate = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;

    setDateToAdd(String(target.value));
    setTryedToAddExistingDate(false);
  };

  const formateDateToString = (date: Date | undefined) =>
    moment(date).format("YYYY-MM-DD");

  const handleClickDeleteDate = (dateToDelete: Date) => {
    setDatesList((prev) => prev.filter((date) => date !== dateToDelete));
  };

  const isNoDatePicked = !dateToAdd;

  // DATE FORM
  const isDateFormValid = !!dateToAdd && !tryedToAddExistingDate;

  const handleSubmitAddDateForm = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    setHasSubmittedDateForm(true);

    if (isDateFormValid) {
      const formattedDate = new Date(dateToAdd);
      const isPickedDateAlreadyInTheList = datesList.find(
        (date) =>
          formateDateToString(date) === formateDateToString(formattedDate)
      );
      if (isPickedDateAlreadyInTheList) {
        setTryedToAddExistingDate(true);
        return;
      }
      setDateToAdd("");
      setDatesList((prev) => [...prev, formattedDate]);
      setHasSubmittedDateForm(false);
    }
  };

  // VALIDATION
  const isNameValid = name.length > 0;
  const isTypeValid = true;
  const isTimeSpendValid = isNumeric(timeSpend) && Number(timeSpend) > 0;

  const isValid = {
    name: isNameValid,
    type: isTypeValid,
    timeSpend: isTimeSpendValid,
  };

  const isFormValid = isNameValid && isTypeValid && isTimeSpendValid;

  const handleSubmitForm = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    setHasSubmittedForm(true);

    if (isFormValid) {
      save({
        name,
        type,
        labels: labelsListIds,
        timeSpend: Math.round(Number(timeSpend) * 100) / 100,
        daysList: datesList,
      });
    }
  };

  return {
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
    formateDateToString,
    handleClickDeleteDate,
    tryedToAddExistingDate,
    isNoDatePicked,
    // DATE FORM
    isDateFormValid,
    hasSubmittedDateForm,
    handleSubmitAddDateForm,
    // SUBMIT FORM
    isValid,
    isFormValid,
    hasSubmittedForm,
    handleSubmitForm,
  };
};

export default useTaskForm;
