import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

export class RecordatorioController {
  static async addRecordatorio(data: any) {
    try {
      const response = await Tarjet.nutriologoApi.addRecordatorio(data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        Utils.swalSuccess("Recordatorio guardado correctamente");
        return response.data;
      } else {
        Utils.swalError("Error al guardar el recordatorio.");
        return null;
      }
    } catch (error) {
      Utils.swalFaileru("Error.", "No se pudo guardar el recordatorio.");
      return null;
    }
  }

  static async getRecordatoriosByPacienteId(id_paciente: number) {
    try {
      const response = await Tarjet.nutriologoApi.getRecordatorios(id_paciente);
      if (response.status === 200) {
        Utils.swalSuccess("Recordatorios obtenidos correctamente");
        return response.data;
      } else {
        Utils.swalError("Error al obtener los recordatorios.");
        return null;
      }
    } catch (error) {
      Utils.swalFaileru("Error.", "No se pudieron obtener los recordatorios.");
      return null;
    }
  }
}