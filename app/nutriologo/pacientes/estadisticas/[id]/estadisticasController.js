import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class EstadisticasController {
  static async getDatosPaciente(id) {
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
