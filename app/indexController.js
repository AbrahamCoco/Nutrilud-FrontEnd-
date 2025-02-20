import { Tarjet } from "./utils/axiosConfig";
import { Utils } from "./utils/utils";
import { JSDOM } from "jsdom";

export class IndexController {
  static async getArticulos() {
    let articulos = null;
    let primerEncabezado = null;
    try {
      const response = await Tarjet.nutriologoApi.getAllArticulos();

      const encabezados = response.data.data.reduce((acc, articulo) => {
        const encabezado = extraerPrimerEncabezado(articulo.contenido);
        acc[articulo.id] = encabezado;
        return acc;
      }, {});
      articulos = response.data.data;
      primerEncabezado = encabezados;
      Utils.swalSuccess("Artículos cargados correctamente");
    } catch (error) {
      console.log(error);
      Utils.swalFailure("Error al cargar los artículos", error.message);
    }
    return { articulos, primerEncabezado };
  }
}

const extraerPrimerEncabezado = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
  for (const tag of headingTags) {
    const headings = doc.getElementsByTagName(tag);
    if (headings.length > 0) {
      return headings[0].textContent;
    }
  }
  return "No hay encabezado";
};
