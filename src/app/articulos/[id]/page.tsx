"use client";
import { use } from "react";
import { Utils } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Params } from "@/interfaces/params";

interface Articulo {
  nameNutriologo: string;
  articulocreated: string;
  [key: string]: any;
}

export default function ArticuloPage({ params }: Params) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [titulo, setTitulo] = useState<string | null>(null);
  const [contenido, setContenido] = useState<string | null>(null);
  const [articuloData, setArticuloData] = useState<Articulo | null>(null);

  useEffect(() => {
    async function fetchArticulo() {
      try {
        const res = await fetch(`/api/articulos?id=${id}`);
        const { articuloData, titulo, contenidoModificado } = await res.json();

        setArticuloData(articuloData);
        setTitulo(titulo);
        setContenido(contenidoModificado);

        Utils.swalSuccess("Artículo cargado correctamente");
      } catch (error) {
        console.error("Error al cargar el artículo:", error);
        const errorMsg =
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message?: string }).message ?? "Error desconocido"
            : String(error);

        Utils.swalError(`Error al cargar el artículo: ${errorMsg}`);
      }
    }

    fetchArticulo();
  }, [id]);

  const fechaFormateada = articuloData?.articulocreated
    ? new Date(articuloData.articulocreated.split(" ")[0]).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Sin fecha";

  return (
    <div className="max-w-7xl mx-auto">
      <article className="prose prose-green max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{titulo}</h1>

        <div className="mb-8 text-justify">
          {contenido && (
            <div
              dangerouslySetInnerHTML={{ __html: contenido }}
              className="editor-content"
            />
          )}
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700">Nutriólogo:</p>
              <p className="text-green-800 font-semibold">
                {articuloData?.nameNutriologo ?? "No disponible"}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Fecha de publicación:</p>
              <p className="text-green-800">{fechaFormateada}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
