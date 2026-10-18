import axios, { AxiosResponse } from "axios";
import type { ArticuloInput } from "@/interfaces/articulo";
import { Tarjet } from "@/utils/axiosConfig";
import { Utils } from "@/utils/utils";

function mensajeError(e: unknown): string {
  if (axios.isAxiosError(e)) {
    const msg = (e.response?.data as { message?: string } | undefined)?.message;
    if (msg) return msg.replace(/<br\s*\/?>/gi, " · ");
  }
  return "No se pudo completar la operación";
}

export class AgregarArticuloController {
  /** Imagen de artículos (portada y editor). Lanza error si falla. */
  static async uploadImage(file: Blob): Promise<string> {
    const form = new FormData();
    form.append("file", file, "image.webp");
    try {
      const { data } = await axios.post<{ data: string }>("/api/articulos/imagen", form);
      if (!data?.data) throw new Error("No se pudo subir la imagen");
      return data.data;
    } catch (e) {
      throw new Error(mensajeError(e));
    }
  }

  static async crear(input: ArticuloInput): Promise<{ id: number; slug: string }> {
    try {
      const { data } = await axios.post<{ data: { id: number; slug: string } }>("/api/articulos", input);
      return data.data;
    } catch (e) {
      throw new Error(mensajeError(e));
    }
  }

  /** Foto de usuarios y pacientes: flujo anterior, sin cambios. */
  static async uploadUserImage(data: FormData) {
    return this._handleRequest(
      () => Tarjet.userApi.upluoadImage(data, { headers: { "Content-Type": "multipart/form-data" } }),
      "No se subio ninguna imagen.",
      "Imagen guardada"
    );
  }

  private static async _handleRequest<T>(
    requestFunc: () => Promise<AxiosResponse<T>>,
    errorMessage: string,
    successTitle: string
  ) {
    try {
      const response = await requestFunc();
      if (successTitle) Utils.swalSuccess(successTitle);
      return response.data;
    } catch (error) {
      Utils.swalError(errorMessage);
      console.error(errorMessage, error);
      return null;
    }
  }
}