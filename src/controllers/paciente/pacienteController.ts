import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

export class PacienteController{
  static async getPacienteById(id: number) {
    try {
      const response = await Tarjet.userApi.getUser(id);
      Utils.swalSuccess("Paciente cargado correctamente.");
      return response.data.data;
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Error al cargar el paciente.";
      Utils.swalError(errorMessage);
      return null;
    }
  }
}