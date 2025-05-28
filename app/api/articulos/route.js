import { Tarjet } from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";
import { JSDOM } from "jsdom";

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

const removerPrimerEncabezado = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
  if (heading) {
    heading.remove();
  }

  return doc.body.innerHTML;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    // Obtener un solo artículo por ID
    try {
      const response = await Tarjet.nutriologoApi.getArticuloId(id);
      const articuloData = response.data.data[0];

      if (!articuloData || !articuloData.contenido) {
        return new Response(JSON.stringify({ error: "Contenido del artículo no encontrado" }), {
          status: 404,
        });
      }

      const titulo = extraerPrimerEncabezado(articuloData.contenido);
      const contenidoModificado = removerPrimerEncabezado(articuloData.contenido);

      return Response.json({
        articuloData,
        titulo,
        contenidoModificado,
      });
    } catch (error) {
      console.error("Error al cargar el artículo:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  } else {
    // Obtener todos los artículos
    try {
      const response = await Tarjet.nutriologoApi.getAllArticulos();
      const articulos = response.data.data;

      const encabezados = articulos.reduce((acc, articulo) => {
        const encabezado = extraerPrimerEncabezado(articulo.contenido);
        acc[articulo.id] = encabezado;
        return acc;
      }, {});

      return Response.json({
        articulos,
        encabezados,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  }
}
