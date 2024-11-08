import { Tarjet } from "../utils/axiosConfig";
import { Utils } from "../utils/utils";

export class NavbarController {
  static async login(usuario, contrasenia) {
    try {
      const response = await Tarjet.userApi.login({ usuario, contrasenia });

      const { token, user } = response.data;
      const { id, tusuario_admin_id, tusuario_nutriologo_id, tusuario_paciente_id, trol_id, nombre, primer_apellido } = user;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id_user", id);
      sessionStorage.setItem("admin_id", tusuario_admin_id);
      sessionStorage.setItem("nutriologo_id", tusuario_nutriologo_id);
      sessionStorage.setItem("paciente_id", tusuario_paciente_id);
      sessionStorage.setItem("trol_id", trol_id);
      sessionStorage.setItem("nombre", `${nombre} ${primer_apellido}`);

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
      if (error.response?.status === 401) {
        Utils.swalError("El token es inválido. Necesita iniciar sesión nuevamente");
      } else {
        console.log(error);
        Utils.swalError("Error al cerrar sesión", error.message);
      }
    }
  }
}
