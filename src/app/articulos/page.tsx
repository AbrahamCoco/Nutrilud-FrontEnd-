import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { obtenerArticulos } from "@/services/articulos";
import ArticulosCarousel from "@/components/ArticulosCarousel";

export const metadata: Metadata = {
  title: "Artículos Nutricionales",
  description: "Consejos y guías de nutriólogos certificados.",
  alternates: { canonical: "/articulos" },
};

const PAGE_SIZE = 12;

const fecha = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })
    : "Sin fecha";

export default async function ArticulosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(0, Number.parseInt(pageParam ?? "0", 10) || 0);

  let articulos;
  try {
    articulos = await obtenerArticulos(page);
  } catch (e) {
    console.error("Error al cargar artículos:", e);
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-green-800">Artículos Nutricionales</h1>
        <p className="text-gray-600">No pudimos cargar los artículos. Intenta de nuevo en unos minutos.</p>
      </div>
    );
  }

  if (articulos.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-green-800">Artículos Nutricionales</h1>
        <div className="flex h-64 flex-col items-center justify-center text-center">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            {page > 0 ? "No hay más artículos" : "No hay artículos publicados"}
          </h2>
          <p className="mb-6 text-gray-600">
            {page > 0 ? "Llegaste al final del listado." : "Vuelve pronto, estamos preparando contenido."}
          </p>
          <Link
            href={page > 0 ? "/articulos" : "/"}
            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
          >
            {page > 0 ? "Ir al inicio del listado" : "Volver al inicio"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {page === 0 && <ArticulosCarousel articulos={articulos.slice(0, 5)} />}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-green-800 md:text-left py-8">
          Artículos Nutricionales
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articulos.map((a, i) => (
            <article
              key={a.id}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <Link href={`/articulos/${a.slug}`} className="flex flex-grow flex-col">
                {a.imagenPortadaUrl && (
                  <Image
                    src={a.imagenPortadaUrl}
                    alt={a.imagenPortadaAlt ?? a.titulo}
                    width={600}
                    height={315}
                    priority={i < 4}
                    className="aspect-[1200/630] w-full object-cover"
                  />
                )}
                <div className="flex flex-grow flex-col p-5">
                  {a.categoria && (
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-green-700">
                      {a.categoria}
                    </p>
                  )}
                  <h2 className="mb-2 text-xl font-semibold text-gray-800 transition-colors group-hover:text-green-600">
                    {a.titulo}
                  </h2>
                  {a.resumen && <p className="mb-3 line-clamp-3 text-sm text-gray-600">{a.resumen}</p>}
                  <p className="mt-auto text-sm text-gray-500">
                    {fecha(a.fechaPublicacion)} · {a.tiempoLecturaMin} min de lectura
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <nav className="mt-10 flex justify-between" aria-label="Paginación">
          {page > 0 ? (
            <Link
              href={`/articulos?page=${page - 1}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              ← Anteriores
            </Link>
          ) : (
            <span />
          )}
          {articulos.length === PAGE_SIZE && (
            <Link
              href={`/articulos?page=${page + 1}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Siguientes →
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}