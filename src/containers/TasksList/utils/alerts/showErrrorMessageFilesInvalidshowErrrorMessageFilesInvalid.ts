import swal from "sweetalert";

const showErrrorMessageFilesInvalid = () =>
  swal(
    "The imported file is not valid",
    "The imported file does not include a list of tasks.",
    "error"
  );

export default showErrrorMessageFilesInvalid;
