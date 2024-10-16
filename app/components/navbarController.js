import { Tarjet } from "../utils/axiosConfig";
import { Utils } from "../utils/utils";

export class NavbarController {
  static async login(usuario, contrasenia) {
    try {
      const response = await Tarjet.userApi.login({
        usuario: usuario,
        contrasenia: contrasenia,
      });

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("id_user", response.data.user.id);
      sessionStorage.setItem("admin_id", response.data.user.tusuario_admin_id);
      sessionStorage.setItem("nutriologo_id", response.data.user.tusuario_nutriologo_id);
      sessionStorage.setItem("paciente_id", response.data.user.tusuario_paciente_id);
      sessionStorage.setItem("trol_id", response.data.user.trol_id);
      sessionStorage.setItem("nombre", response.data.user.nombre + " " + response.data.user.primer_apellido);

      Utils.swalSuccess("Inicio de sesión correcto");
      return response;
    } catch (error) {
      Utils.swalFailure("Error al iniciar sesión", error.message);
      return error;
    }
  }

  static async logout(token) {
    try {
      await Tarjet.userApi.logout({ headers: { Authorization: `Bearer ${token}` } });
      sessionStorage.clear();
      Utils.swalSuccess("Cerró sesión correctamente");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Utils.swalError("El token es inválido. Necesita iniciar sesión nuevamente");
      } else {
        console.log(error);
        Utils.swalError("Error al cerrar sesión", error.message);
      }
    }
  }
}
