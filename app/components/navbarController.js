import { decodeToken } from "../utils/auth";
import { Tarjet } from "../utils/axiosConfig";
import { Utils } from "../utils/utils";

export class NavbarController {
  static async login(usuario, contrasenia) {
    try {
      const response = await Tarjet.userApi.login(usuario, contrasenia);
      const token = response.data.data;
      const decode = decodeToken(token);

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", parseInt(decode.id, 10));
      sessionStorage.setItem("trol_id", parseInt(decode.rol_id, 10));
      sessionStorage.setItem("rol", decode.role);
      sessionStorage.setItem("id_admin", parseInt(decode.id_admin, 10));
      sessionStorage.setItem("id_nutriologo", parseInt(decode.id_nutriologo, 10));
      sessionStorage.setItem("id_paciente", parseInt(decode.id_paciente, 10));
      sessionStorage.setItem("nombre", decode.nombre);
      sessionStorage.setItem("primer_apellido", decode.primer_apellido);
      Utils.swalSuccess("Inicio de sesión correcto");
      return decode;
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
