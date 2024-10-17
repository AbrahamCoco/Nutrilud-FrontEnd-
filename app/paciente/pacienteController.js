import { Tarjet } from "../utils/axiosConfig";
import { Utils } from "../utils/utils";

export class PacienteController {
  static async getUser(id) {
    try {
      const response = await Tarjet.userApi.getUser(id);
      Utils.swalSuccess("Datos cargados correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al cargar datos del paciente", error.message);
      return null;
    }
  }
}
