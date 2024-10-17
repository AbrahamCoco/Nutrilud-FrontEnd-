import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class AgregarArticuloController {
  static async uploadImage(data) {
    try {
      const response = await Tarjet.userApi.upluoadImage(data, { headers: { "Content-Type": "multipart/form-data" } });
      return response.data.url;
    } catch (error) {
      Utils.swalError("No se subio ninguna imagen", error.message);
      return null;
    }
  }

  static async AddArticulo(data) {
    try {
      const response = await Tarjet.nutriologoApi.addArticulo(data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      Utils.swalSuccess("Articulo agregado", "El articulo se agrego correctamente");
      return response.data;
    } catch (error) {
      Utils.swalError("Error al agregar articulo", error.message);
      return null;
    }
  }
}
