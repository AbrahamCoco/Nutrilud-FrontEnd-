"use client";
import type { Articulo } from "@/interfaces/articulo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FALLBACK = "/images/Nutricion.png";

export default function ArticulosCarousel({ articulos }: { articulos: Articulo[] }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = articulos.length;

  useEffect(() => {
    if (total <= 1 || hovered) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total, hovered]);

  if (total === 0) return null;

  const prev = () => setCurrent((p) => (p === 0 ? total - 1 : p - 1));
  const next = () => setCurrent((p) => (p + 1) % total);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Artículos destacados"
      className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl md:h-[32rem]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {articulos.map((a, i) => {
        const activo = i === current;
        return (
          <div
            key={a.id}
            aria-hidden={!activo}
            className={`absolute inset-0 transition-opacity duration-500 ${activo ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
          >
            <Link href={`/articulos/${a.slug}`} tabIndex={activo ? 0 : -1} className="block h-full w-full">
              <Image
                src={a.imagenPortadaUrl || FALLBACK}
                alt={a.imagenPortadaAlt ?? a.titulo}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/50 p-4 backdrop-blur-sm">
                <p className="mb-2 text-center text-lg font-medium text-white md:text-xl">{a.titulo}</p>
                <p className="text-center text-sm text-gray-200">
                  {a.fechaPublicacion
                    ? new Date(a.fechaPublicacion).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : ""}
                </p>
              </div>
            </Link>
          </div>
        );
      })}

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50"
          >
            ›
          </button>
          <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {articulos.map((a, i) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Ir al artículo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === current ? "w-4 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}