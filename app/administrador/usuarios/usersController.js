import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class UsersController {
  static async getAllUsers() {
    try {
      const response = await Tarjet.adminApi.getAllAdminsAndNutris();

      Utils.swalSuccess("Usuarios cargados correctamente");
      return { users: response.data || [] };
    } catch (error) {
      Utils.swalError("Error al cargar usuarios", error.message);
      return { users: [] };
    }
  }
}
