"use client";
import ArticulosCarousel from "@/components/ArticulosCarousel";
import { Articulo } from "@/interfaces/articulo";
import { Utils } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ArticulosPage() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
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

  if (loading) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-12 bg-gray-300 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <div className="p-6 flex flex-col gap-3">
                  <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2 mt-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (articulos.length === 0) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center md:text-left">Artículos Nutricionales</h1>

          <div className="flex flex-col items-center justify-center h-64">
            <div className="bg-red-100 p-4 rounded-full mb-4">
              <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No hay artículos disponibles</h2>
            <p className="text-gray-600 mb-6">Parece que no hay contenido para mostrar en este momento</p>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Recargar página
              </button>
              <Link
                href="/" // O la ruta principal de tu aplicación
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

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