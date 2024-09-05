import Swal from "sweetalert2";

export class Utils {
  static swalFailure(title, message) {
    Swal.fire({
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      icon: "warning",
      width: 300,
      title: title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  static swalError(message) {
    Swal.fire({
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      icon: "error",
      width: 300,
      title: "Ooops...",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  static swalSuccess(message) {
    Swal.fire({
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      icon: "success",
      width: 300,
      title: "¡Exito...!",
      text: message,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  static swalFire(title, message, icon) {
    Swal.fire({
      title: "¿Desea eliminar la ruta seleccionada?",
      text: "No podrá revertir esta acción, esta acción podría causar daños en el sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    });
  }
}
