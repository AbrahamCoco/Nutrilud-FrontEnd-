import { Tarjet } from "../../utils/axiosConfig";
import { Utils } from "../../utils/utils";

export class RegistroController {
  static async addUser(data) {
    try {
      response = await Tarjet.userApi.register(data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Utils.swalSuccess("Usuario registrado", "El usuario ha sido registrado correctamente");
      return response;
    } catch (error) {
      Utils.swalError("Error", "No se pudo registrar el usuario");
      return error;
    }
  }
}
