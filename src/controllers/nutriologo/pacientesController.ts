import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

export class PacientesController{
  static async getAllPacientes(){
    try {
      const response = await Tarjet.nutriologoApi.getAllPacientes();
      Utils.swalSuccess("Pacientes cargados correctamente.");
      return response.data.data;
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Error al cargar los pacientes.";
      Utils.swalError(errorMessage);
      return [];
    }
  }

  static async addPaciente(data : any) {
    try {
      const response = await Tarjet.userApi.register(data, {
        headers: { "Content-Type": "application/json" },
      });
      Utils.swalSuccess("Usuario guardado correctamente");
      return response;
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Error al guardar el paciente.";
      Utils.swalError(errorMessage);
      return null;
    }
  }

  static async deletePaciente(id: number) {
    try {
      const response = await Tarjet.nutriologoApi.deletePaciente(id);
      if (response.data.success) {
        Utils.swalSuccess("Paciente eliminado correctamente");
        return response.data;
      } else {
        Utils.swalError(response.data.message || "Error al eliminar el paciente.");
        console.error("Error al eliminar el paciente:", response.data.message);
      }
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Error al eliminar el paciente.";
      Utils.swalError(errorMessage);
      return null;
    }
  }

  static async updatePaciente(id: number, data: any) {
    try {
      const response = await Tarjet.nutriologoApi.updatePaciente(id, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success) {
        Utils.swalSuccess("Paciente actualizado correctamente");
        return response.data;
      } else {
        Utils.swalError(response.data.message || "Error al actualizar el paciente.");
        console.error("Error al actualizar el paciente:", response.data.message);
      }
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : "Error al actualizar el paciente.";
      Utils.swalError(errorMessage);
      return null;
    }
  }
}