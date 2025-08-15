import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

export class EstadisticasController {
  static async getDatosPaciente(id : number) {
    try {
      const response = await Tarjet.nutriologoApi.getAllConsultas(id);
      if (response.data.success == true){
        Utils.swalSuccess(response.data.message);
        return response.data.data;
      } else {
        Utils.swalFaileru("Error", response.data.message);
        return null;
      }
    } catch (error) {
      Utils.swalError("Error al cargar los datos.");
      return null;
    }
  }
}