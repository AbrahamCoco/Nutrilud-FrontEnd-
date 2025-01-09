import { Tarjet } from "./utils/axiosConfig";
import { Utils } from "./utils/utils";

export class IndexController {
  static async getArticulos() {
    try {
      const response = await Tarjet.nutriologoApi.getAllArticulos();

      const encabezados = response.data.data.reduce((acc, articulo) => {
        const encabezado = extraerPrimerEncabezado(articulo.contenido);
        acc[articulo.id] = encabezado;
        return acc;
      }, {});
      Utils.swalSuccess("Artículos cargados correctamente");
      return { response, encabezados };
    } catch (error) {
      console.log(error);
      Utils.swalFailure("Error al cargar los artículos", error.message);
      return { response: null, encabezados: null };
    }
  }
}

const extraerPrimerEncabezado = (htmlContent) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
  return heading ? heading.outerHTML : "No hay encabezado";
};
