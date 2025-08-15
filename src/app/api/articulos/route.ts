import { Tarjet } from "@/utils/axiosConfig";
import { JSDOM } from "jsdom";

// Tipado base de un artículo (ajusta según tu backend)
interface Articulo {
  id: number;
  contenido: string;
  [key: string]: any; // para campos adicionales
}

// Extrae el primer encabezado de cualquier tipo <h1>-<h6>
const extraerPrimerEncabezado = (htmlContent: string): string => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
  for (const tag of headingTags) {
    const headings = doc.getElementsByTagName(tag);
    if (headings.length > 0) {
      return headings[0].textContent || "Sin texto";
    }
  }
  return "No hay encabezado";
};

// Remueve el primer encabezado de cualquier tipo <h1>-<h6>
const removerPrimerEncabezado = (htmlContent: string): string => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
  if (heading) {
    heading.remove();
  }

  return doc.body.innerHTML;
};

// Método GET
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "0", 10);

  // Obtener un solo artículo por ID
  if (id) {
    try {
      const response = await Tarjet.nutriologoApi.getArticuloId(id);
      const articuloData: Articulo = response.data.data;

      if (!articuloData || !articuloData.contenido) {
        return new Response(
          JSON.stringify({ error: "Contenido del artículo no encontrado" }),
          { status: 404 }
        );
      }

      const titulo = extraerPrimerEncabezado(articuloData.contenido);
      const contenidoModificado = removerPrimerEncabezado(articuloData.contenido);

      return Response.json({
        articuloData,
        titulo,
        contenidoModificado,
      });
    } catch (error: any) {
      console.error("Error al cargar el artículo:", error);
      return new Response(JSON.stringify({ error: error.message || "Error del servidor" }), {
        status: 500,
      });
    }
  }

  // Obtener todos los artículos
  try {
    const response = await Tarjet.nutriologoApi.getAllArticulos();
    const articulos: Articulo[] = response.data.data;

    const encabezados: Record<number, string> = articulos.reduce((acc, articulo) => {
      const encabezado = extraerPrimerEncabezado(articulo.contenido);
      acc[articulo.id] = encabezado;
      return acc;
    }, {} as Record<number, string>);

    return Response.json({
      articulos,
      encabezados,
    });
  } catch (error: any) {
    console.error("Error al cargar artículos:", error);
    return new Response(JSON.stringify({ error: error.message || "Error del servidor" }), {
      status: 500,
    });
  }
}
