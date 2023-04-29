import checkIfListIsInsideList from "@/containers/TasksList/utils/checkIfListIsInsideList";

type Params = {
  noId: boolean;
};

const checkIfDataIsATask = (data: any, params?: Params) => {
  if (typeof data !== "object") {
    return false;
  }

  const dataItemKeys = Object.keys(data);

  const paramsThathMustExistOnObject = [
    "name",
    "type",
    "labels",
    "timeSpend",
    "daysList",
  ];

  if (!params || (params && !params.noId)) {
    paramsThathMustExistOnObject.push("id");
  }

  const doesObjectHaveAllTaskKeys = checkIfListIsInsideList(
    dataItemKeys,
    paramsThathMustExistOnObject
  );

  if (!doesObjectHaveAllTaskKeys) {
    return false;
  }

  return true;
};

export default checkIfDataIsATask;
