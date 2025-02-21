import { Tarjet } from "@/app/utils/axiosConfig";
import { JSDOM } from "jsdom";

export class ArticuloController {
  static async getArticulo(id) {
    let articuloData = null;
    let titulo = null;
    let contenidoModificado = null;
    try {
      const response = await Tarjet.nutriologoApi.getArticuloId(id);
      articuloData = response.data.data[0];

      if (!articuloData || !articuloData.contenido) {
        throw new Error("Contenido del artículo no encontrado");
      }

      titulo = await extraerPrimerEncabezado(articuloData.contenido);
      contenidoModificado = await removerPrimerEncabezado(articuloData.contenido);

      // console.log("Articulo cargado");
    } catch (error) {
      console.error("Error al cargar el artículo:", error);
    }
    return { articuloData, titulo, contenidoModificado };
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

const removerPrimerEncabezado = async (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
  if (heading) {
    heading.remove();
  }

  return doc.body.innerHTML;
};
