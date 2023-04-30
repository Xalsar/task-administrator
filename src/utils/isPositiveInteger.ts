function isPositiveInteger(value: any) {
  return (
    !isNaN(parseFloat(value)) &&
    isFinite(value) &&
    Number.isInteger(Number(value)) &&
    Number(value) > -1
  );
}
export default isPositiveInteger;
