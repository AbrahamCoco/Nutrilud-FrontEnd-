import { Tarjet } from "../utils/axiosConfig";
import { Utils } from "../utils/utils";

export class PerfilController {
  static async calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const cumpleanos = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    const mes = hoy.getMonth() - cumpleanos.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }
    return edad;
  }

  static async getUser(idUser) {
    try {
      const response = await Tarjet.userApi.getUser(idUser);
      Utils.swalSuccess("Datos cargados correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al cargar los datos");
      return null;
    }
  }
}
