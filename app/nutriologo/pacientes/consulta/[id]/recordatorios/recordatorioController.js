import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class RecordatorioController {
  static async handleRequest(apiCall, successMessage, errorMessage) {
    try {
      const response = await apiCall;
      Utils.swalSuccess(successMessage);
      return response;
    } catch (error) {
      Utils.swalError(errorMessage);
      return null;
    }
  }

  static async postRecordatorio(formData) {
    return this.handleRequest(
      Tarjet.nutriologoApi.addRecordatorio(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      "Recordatorio agregado correctamente",
      "Error al agregar el recordatorio"
    );
  }

  static async getRecordatorios(id_paciente) {
    return this.handleRequest(Tarjet.nutriologoApi.getRecordatorios(id_paciente), "Recordatorios cargados correctamente", "Error al obtener los recordatorios");
  }
}
