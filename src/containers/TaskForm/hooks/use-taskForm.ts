import Task from "../../../../types/Task";
import TaskDataToSave from "../../../../types/TaskDataToSave";

import { useState, useEffect } from "react";

import moment from "moment";

import isPositiveInteger from "@/utils/isPositiveInteger";

type Props = {
  save: (data: Task | TaskDataToSave) => void;
  taskToEdit: Task | undefined;
};

const useTaskForm = ({ save, taskToEdit }: Props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("story");
  const [timeSpendHours, setTimeSpendHours] = useState("");
  const [timeSpendMinutes, setTimeSpendMinutes] = useState("");
  const [labelsListIds, setLabelsListIds] = useState<number[]>([]);

  const [dateToAdd, setDateToAdd] = useState("");
  const [datesList, setDatesList] = useState<Date[]>([]);

  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const [hasSubmittedDateForm, setHasSubmittedDateForm] = useState(false);

  const [tryedToAddExistingDate, setTryedToAddExistingDate] = useState(false);

  useEffect(() => {
    if (!taskToEdit) return;

    const formatedTimeSpendH = Math.trunc(Number(taskToEdit.timeSpend) / 60);
    const formatedTimeSpendM = taskToEdit.timeSpend % 60;

    setName(taskToEdit.name);
    setType(taskToEdit.type);
    setTimeSpendHours(String(formatedTimeSpendH));
    setTimeSpendMinutes(String(formatedTimeSpendM));
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
    setTimeSpendHours(String(target.value));
  };

  const handleTimeSpendMinutes = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setTimeSpendMinutes(String(target.value));
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

  // HOURS
  const isTimeSpendHoursDefined = timeSpendHours.length > 0;
  const isTimeSpendHoursNumeric = isPositiveInteger(timeSpendHours);
  const isTimeSpendHoursValid =
    !isTimeSpendHoursDefined ||
    (isTimeSpendHoursDefined && isPositiveInteger(timeSpendHours));

  // MINUTES
  const isTimeSpendMinutesDefined = timeSpendMinutes.length > 0;
  const isTimeSpendMinutesNumeric = isPositiveInteger(timeSpendMinutes);
  const isTimeSpendMinutesBetweenRanges =
    Number(timeSpendMinutes) > -1 && Number(timeSpendMinutes) < 60;
  const isTimeSpendMinutesValid =
    !isTimeSpendMinutesDefined ||
    (isTimeSpendMinutesDefined &&
      isPositiveInteger(timeSpendMinutes) &&
      isTimeSpendMinutesBetweenRanges);

  const isAnyTimeSpendDefined =
    (isTimeSpendHoursDefined && Number(timeSpendHours) > 0) ||
    (isTimeSpendMinutesDefined && Number(timeSpendMinutes) > 0);

  const isValid = {
    name: isNameValid,
    type: isTypeValid,
    timeSpendHours: isTimeSpendHoursValid && isAnyTimeSpendDefined,
    timeSpendMinutes: isTimeSpendMinutesValid && isAnyTimeSpendDefined,
  };

  // ERROR MESSAGES
  let timeSpendHoursErrorMessage = "";

  if (!isAnyTimeSpendDefined) {
    timeSpendHoursErrorMessage =
      "You need to specify how much time you spend on the tash";
  } else if (!isTimeSpendHoursNumeric || !isTimeSpendMinutesBetweenRanges) {
    timeSpendHoursErrorMessage =
      "Time spend (h) must be a positive integer. ex: (1,2,3,4,5...)";
  }

  let timeSpendMinutesErrorMessage = "";

  if (!isAnyTimeSpendDefined) {
    timeSpendMinutesErrorMessage =
      "You need to specify how much time you spend on the tash";
  } else if (!isTimeSpendMinutesNumeric || !isTimeSpendMinutesBetweenRanges) {
    timeSpendMinutesErrorMessage =
      "Time spend (m) must be an integer between 0 and 60";
  }

  const errorMessages = {
    timeSpendHours: timeSpendHoursErrorMessage,
    timeSpendMinutes: timeSpendMinutesErrorMessage,
  };

  // VALIDATION
  const isFormValid =
    isValid.name &&
    isValid.type &&
    isValid.timeSpendHours &&
    isValid.timeSpendMinutes;

  // SUBMITTING
  const handleSubmitForm = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    setHasSubmittedForm(true);

    if (isFormValid) {
      const timeSpendTotal =
        Number(timeSpendHours) * 60 + Number(timeSpendMinutes);

      save({
        name,
        type,
        labels: labelsListIds,
        timeSpend: timeSpendTotal,
        daysList: datesList,
      });
    }
  };

  // SORT DATES
  const sortedDates = datesList.sort((date1, date2) => {
    if (date1 > date2) {
      return 1;
    } else if (date1 < date2) {
      return -1;
    }

    return 0;
  });

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
    timeSpendHours,
    handleTypeTimeSpend,
    timeSpendMinutes,
    handleTimeSpendMinutes,
    // DATES LIST
    dateToAdd,
    handlePickDate,
    datesList: sortedDates,
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
    errorMessages,
    hasSubmittedForm,
    handleSubmitForm,
  };
};

export default useTaskForm;
