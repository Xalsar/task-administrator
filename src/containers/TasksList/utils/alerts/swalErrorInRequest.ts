import swal from "sweetalert";

const swalErrorInRequest = () =>
  swal(
    "Something has gone wrong!",
    "Refresh the page and try again. If the error persists, submit the bug report via email at: xxx@xxx.com. We will gladly solve this issue.",
    "error"
  );

export default swalErrorInRequest;
