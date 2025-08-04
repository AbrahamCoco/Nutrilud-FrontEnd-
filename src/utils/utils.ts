import Swal from "sweetalert2";

export class Utils {
  static swalFaileru(title: string, message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "warning",
      width: 300,
      title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalError(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "error",
      width: 300,
      title: "Ooops...",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalSuccess(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "success",
      width: 300,
      title: "Exito...!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  static swalWarning(message: string) {
    Swal.fire({
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      icon: "warning",
      width: 300,
      title: "Atencion...!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    })
  }
}