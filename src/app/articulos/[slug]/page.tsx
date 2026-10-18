import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { obtenerArticuloPorSlug } from "@/services/articulos";

type Props = { params: Promise<{ slug: string }> };

// cache() evita pedir el artículo dos veces (metadatos + página)
const getArticulo = cache(obtenerArticuloPorSlug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticulo(slug);
  if (!a) return { title: "Artículo no encontrado" };

  return {
    title: a.titulo,
    description: a.resumen ?? undefined,
    alternates: { canonical: `/articulos/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titulo,
      description: a.resumen ?? undefined,
      images: a.imagenPortadaUrl ? [a.imagenPortadaUrl] : undefined,
      publishedTime: a.fechaPublicacion ?? undefined,
      modifiedTime: a.fechaActualizacion ?? undefined,
      authors: [a.nameNutriologo],
    },
    twitter: { card: "summary_large_image" },
  };
}

const fecha = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })
    : "";

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params;
  const a = await getArticulo(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.resumen,
    image: a.imagenPortadaUrl ? [a.imagenPortadaUrl] : undefined,
    datePublished: a.fechaPublicacion,
    dateModified: a.fechaActualizacion,
    author: {
      "@type": "Person",
      name: a.nameNutriologo,
      jobTitle: a.autorEspecialidad ?? undefined,
    },
  };

  return (
    <article className="mx-auto max-w-[95%] md:max-w-[1160px] px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Link href="/articulos" className="text-sm text-green-700 hover:underline">
        ← Volver a artículos
      </Link>

      {a.categoria && <p className="mt-4 text-sm font-medium text-green-700">{a.categoria}</p>}
      <h1 className="mt-1 text-4xl font-bold text-gray-900">{a.titulo}</h1>
      <p className="mt-2 text-sm text-gray-500">
        {a.nameNutriologo}
        {a.autorCedula && ` · Céd. prof. ${a.autorCedula}`} · {fecha(a.fechaPublicacion)} ·{" "}
        {a.tiempoLecturaMin} min de lectura
      </p>

      {a.imagenPortadaUrl && (
        <Image
          src={a.imagenPortadaUrl}
          alt={a.imagenPortadaAlt ?? a.titulo}
          width={1200}
          height={630}
          priority
          className="my-6 w-full rounded-lg"
        />
      )}

      {/* HTML sanitizado en Next y de nuevo en Spring al guardar */}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: a.contenidoHtml ?? "" }} />

      {a.etiquetas.length > 0 && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {a.etiquetas.map((t) => (
            <li key={t} className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-800">
              #{t}
            </li>
          ))}
        </ul>
      )}

      <aside className="mt-10 flex items-center gap-4 rounded-lg border p-4">
        {a.autorFoto && (
          <Image
            src={a.autorFoto}
            alt={a.nameNutriologo}
            width={64}
            height={64}
            unoptimized
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{a.nameNutriologo}</p>
          {a.autorEspecialidad && <p className="text-sm text-gray-600">{a.autorEspecialidad}</p>}
          {a.autorBiografia && <p className="text-sm text-gray-600">{a.autorBiografia}</p>}
          {a.autorId && (
            <Link
              href={`/agenda/${a.autorId}`}
              className="mt-2 inline-block text-sm font-medium text-green-700 hover:underline"
            >
              Agenda una consulta
            </Link>
          )}
        </div>
      </aside>

      <p className="mt-8 text-xs text-gray-500">
        Este contenido es informativo y no sustituye una consulta con un profesional de la salud.
      </p>
    </article>
  );
}