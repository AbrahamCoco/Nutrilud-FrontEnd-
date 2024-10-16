import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class RecordatorioController {
  static async postRecordatorio(formData) {
    try {
      const response = await Tarjet.nutriologoApi.addRecordatorio(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Utils.swalSuccess("Recordatorio agregado correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al agregar el recordatorio");
      return null;
    }
  }

  static async getRecordatorios(id_paciente) {
    try {
      const response = await Tarjet.nutriologoApi.getRecordatorios(id_paciente);
      Utils.swalSuccess("Recordatorios cargados correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error al obtener los recordatorios");
      return null;
    }
  }
}
