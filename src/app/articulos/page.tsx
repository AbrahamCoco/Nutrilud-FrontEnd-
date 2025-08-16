"use client";
import ArticulosCarousel from "@/components/ArticulosCarousel";
import { Utils } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticulosPage(){
  const [articulos, setArticulos] = useState<any[]>([]);
  const [primerEncabezado, setPrimerEncabezado] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticulos() {
      try {
        const res = await fetch("/api/articulos");
        const { articulos, encabezados } = await res.json();
        setArticulos(articulos);
        setPrimerEncabezado(encabezados);
        Utils.swalSuccess("Artículos cargados correctamente");
      } catch (error) {
        console.error("Error al cargar los articulos: ", error);
        const errorMsg = typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message ?? "Error desconocido"
          : String(error);
        Utils.swalError(`Error al cargar los artículos: ${errorMsg}`);
        setArticulos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticulos();
  }, []);

  return (
    <>
      <ArticulosCarousel articulos={articulos} primerEncabezado={primerEncabezado} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center md:text-left">Artículos Nutricionales</h1>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-500">Cargando artículos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articulos ? (
              articulos.map((articulo) => (
                <div key={articulo.id} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                    <Link href={`/articulos/${articulo.id}`} className="block p-6 flex-grow">
                      <h3
                        className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 mb-3"
                        dangerouslySetInnerHTML={{
                          __html: primerEncabezado?.[articulo.id] || "Sin título",
                        }}
                      />
                      <p className="text-gray-500 text-sm mt-auto">
                        Publicado el{" "}
                        <span className="font-medium">
                          {new Date(articulo.articulocreated.split(" ")[0]).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center">
                <p className="text-gray-500">No hay artículos disponibles en este momento.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}