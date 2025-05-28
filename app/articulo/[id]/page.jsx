"use client";
import { Utils } from "@/app/utils/utils";
import { useEffect, useState } from "react";

export default function Articulo({ params }) {
  const [titulo, setTitulo] = useState("");
  const [contenidoModificado, setContenidoModificado] = useState("");
  const [articuloData, setArticuloData] = useState(null);

  useEffect(() => {
    async function fetchArticulo() {
      const { id } = await params;
      try {
        const res = await fetch(`/api/articulos?id=${id}`);
        const { articuloData, titulo, contenidoModificado } = await res.json();
        setArticuloData(articuloData);
        setTitulo(titulo);
        setContenidoModificado(contenidoModificado);
        Utils.swalSuccess("Artículo cargado correctamente");
      } catch (error) {
        console.error("Error al cargar el artículo:", error);
        Utils.swalError("Error al cargar el artículo", error.message);
      }
    }

    fetchArticulo();
  }, [params]);

  return (
    <div className="max-w-7xl mx-auto">
      <article className="prose prose-green max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{titulo}</h1>

        <div className="mb-8 text-justify">
          <div dangerouslySetInnerHTML={{ __html: contenidoModificado }} className="editor-content" />
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700">Nutriólogo:</p>
              <p className="text-green-800 font-semibold">
                {articuloData?.tusuario_nutriologo?.nombre} {articuloData?.tusuario_nutriologo?.primer_apellido} {articuloData?.tusuario_nutriologo?.segundo_apellido}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Fecha de publicación:</p>
              <p className="text-green-800">
                {new Date(articuloData?.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
