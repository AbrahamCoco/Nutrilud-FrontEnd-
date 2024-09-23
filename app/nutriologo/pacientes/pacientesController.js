import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class PacientesController {
  static async getAllPacientes() {
    try {
      const response = await Tarjet.nutriologoApi.getAllPacientes();
      Utils.swalSuccess("Pacientes cargados correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al cargar pacientes", error.message);
      return [];
    }
  }

  static async addPaciente(data) {
    try {
      const response = await Tarjet.userApi.register(data, {
        headers: { "Content-Type": "application/json" },
      });
      Utils.swalSuccess("Paciente guardado correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al guardar paciente", error.message);
      return null;
    }
  }
}
