import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export class ArticuloController {
  static async getArticulo(id) {
    try {
      const response = await Tarjet.nutriologoApi.getArticuloId(id);
      const articuloData = response.data.data[0];

      if (!articuloData || !articuloData.contenido) {
        throw new Error("Contenido del artículo no encontrado");
      }

      const titulo = extraerEncabezado(articuloData.contenido);
      const contenidoModificado = removerPrimerEncabezado(articuloData.contenido);

      Utils.swalSuccess("Artículo cargado correctamente");
      return { articuloData, titulo, contenidoModificado };
    } catch (error) {
      Utils.swalFailure("Error al cargar el artículo: ", error);
      return { articuloData: null, titulo: null, contenidoModificado: null };
    }
  }
}

const extraerEncabezado = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
  return heading ? heading.outerHTML : "No hay encabezado";
};

const removerPrimerEncabezado = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
  if (heading) {
    heading.remove();
  }

  return doc.body.innerHTML;
};
