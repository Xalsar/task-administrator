import { useState } from "react";

import moment from "moment";

const useTaskForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [timeSpend, setTimeSpend] = useState(0);
  const [labelsListIds, setLabelsListIds] = useState<number[]>([]);

  const [dateToAdd, setDateToAdd] = useState("");
  const [datesList, setDatesList] = useState<Date[]>([]);

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
    setTimeSpend(Number(target.value));
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
  };

  const handleClickAddDateToList = () => {
    const formattedDate = new Date(dateToAdd);

    setDateToAdd("");
    setDatesList((prev) => [...prev, formattedDate]);
  };

  const formateDateToString = (date: Date | undefined) =>
    moment(date).format("YYYY-MM-DD");

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
    handleClickAddDateToList,
    formateDateToString,
  };
};

export default useTaskForm;
