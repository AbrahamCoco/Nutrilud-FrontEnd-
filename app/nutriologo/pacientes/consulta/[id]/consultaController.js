import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class ConsultaController {
  static async getPacienteId(id) {
    try {
      const response = await Tarjet.nutriologoApi.getPacienteId(id);
      Utils.swalSuccess("Paciente cargado correctamente");
      return response.data;
    } catch (error) {
      Utils.swalError("Error al cargar el paciente");
      return null;
    }
  }

  static async getAllConsultas(id) {
    try {
      const response = await Tarjet.nutriologoApi.getAllConsultas(id);
      return response;
    } catch (error) {
      Utils.swalError("Error al cargar las consultas");
      return null;
    }
  }

  static async addConsulta(id, data) {
    try {
      const response = await Tarjet.nutriologoApi.addConsulta(id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Utils.swalSuccess("Consulta agregada correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al agregar la consulta");
      return null;
    }
  }
}
