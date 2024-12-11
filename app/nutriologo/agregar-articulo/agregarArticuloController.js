import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class AgregarArticuloController {
  static async uploadImage(data) {
    return this._handleRequest(() => Tarjet.userApi.upluoadImage(data, { headers: { "Content-Type": "multipart/form-data" } }), "No se subio ninguna imagen");
  }

  static async AddArticulo(data) {
    return this._handleRequest(
      () =>
        Tarjet.nutriologoApi.addArticulo(data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }),
      "Error al agregar articulo",
      "Articulo agregado",
      "El articulo se agrego correctamente"
    );
  }

  static async _handleRequest(requestFunc, errorMessage, successTitle = null, successMessage = null) {
    try {
      const response = await requestFunc();
      if (successTitle && successMessage) {
        Utils.swalSuccess(successTitle, successMessage);
      }
      return response.data;
    } catch (error) {
      Utils.swalError(errorMessage, error.message);
      return null;
    }
  }
}
