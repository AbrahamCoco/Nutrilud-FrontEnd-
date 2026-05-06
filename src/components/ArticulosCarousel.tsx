import { Tarjet } from "@/utils/axiosConfig";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Articulo {
  id: number;
  foto: string | null;
  articulocreated: string;
}

export default function ArticulosCarousel({ articulos, primerEncabezado } : { articulos: Articulo[], primerEncabezado: string | null }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if(!Array.isArray(articulos) || articulos.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articulos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articulos, isHovered]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? articulos.length - 1 : prev - 1));
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articulos.length);
  }

  if (!Array.isArray(articulos) || articulos.length === 0) {
    return (
      <div className="relative w-full h-96 md:h-[32rem] overflow-hidden rounded-lg shadow-xl">
        {/* Skeleton del contenedor principal */}
        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
        
        {/* Skeleton de los controles */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-400 rounded-full p-2 w-10 h-10 animate-pulse" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-400 rounded-full p-2 w-10 h-10 animate-pulse" />
        
        {/* Skeleton de los indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
          ))}
        </div>
        
        {/* Skeleton del overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
          <div className="h-6 bg-gray-400 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-400 rounded animate-pulse w-3/4 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 md:h-[32rem] overflow-hidden rounded-lg shadow-xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Contenedor de slides */}
      <div className="relative w-full h-full">
        {articulos.map((articulo, index) => {
          // ✔ Evita error cuando la foto es null/undefined
          const fotoSegura = articulo?.foto
            ? `${Tarjet.view}${articulo.foto.replace(/\\/g, "/")}`
            : "/images/Nutricion.png"; // imagen por defecto

          return (
            <div
              key={articulo.id}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              <Link href={`/articulos/${articulo.id}`} className="block w-full h-full">
                <Image
                  src={fotoSegura}
                  fill
                  className="object-cover"
                  alt={primerEncabezado?.[articulo.id] ?? "Sin título"}
                  priority={index === currentIndex}
                />

              {/* Overlay con información */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
                  <div
                    className="text-white text-lg md:text-xl font-medium mb-2 text-center"
                    dangerouslySetInnerHTML={{
                    __html: primerEncabezado?.[articulo.id] || "",
                    }}
                  />
                  <p className="text-gray-200 text-sm text-center">
                    Publicado el{" "}
                    {new Date(articulo.articulocreated.split(" ")[0]).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Controles de navegación */}
      {articulos.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-10"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-10"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores de posición */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {articulos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
                aria-label={`Ir a slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}