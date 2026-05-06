import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

export class UsersController {
  static async getAllUsers() {
    try {
      const response = await Tarjet.adminApi.getAllAdminsAndNutris();
      Utils.swalSuccess("Usuarios obtenidos exitosamente");
      return response.data;
    } catch (error) {
      Utils.swalError("Error al obtener usuarios");
      return null;
    }
  }
}