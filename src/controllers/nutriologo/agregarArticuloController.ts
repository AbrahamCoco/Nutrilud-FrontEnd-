import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";
import { AxiosResponse } from "axios";

export class AgregarArticuloController {
  static async uploadImage(data: FormData) {
    return this._handleRequest(() => Tarjet.userApi.upluoadImage(data, {headers: { "Content-Type": "multipart/form-data" }}), "No se subio ninguna imagen.", "Imagen guardada");
  }

  static async AddArticulo(data: any) {
    return this._handleRequest(() => Tarjet.nutriologoApi.addArticulo(data), "Error al agregar articulo", "Articulo agregado");
  }

  static async _handleRequest<T>(requestFunc: () => Promise<AxiosResponse<T>>, errorMessage: string, successTitle: string) {
    try {
      const response = await requestFunc();
      if (successTitle) {
        Utils.swalSuccess(successTitle);
      }
      return response.data;
    } catch (error) {
      Utils.swalError(errorMessage);
      return null;
    }
  }
}