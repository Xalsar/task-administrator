const checkIfListIsInsideList = (arr: string[], target: string[]) =>
  target.every((v) => arr.includes(v));

export default checkIfListIsInsideList;
