"use client";
import RichEditorClient from "@/components/users/nutriologo/editor/RichEditorClient";
import type { EditorContent } from "@/components/users/nutriologo/editor/RichEditor";
import { AgregarArticuloController } from "@/controllers/nutriologo/agregarArticuloController";
import type { ArticuloInput, EstadoArticulo } from "@/interfaces/articulo";
import { blocksToText } from "@/utils/articulo";
import { resizeImage } from "@/utils/imageResize";
import { Utils } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const CATEGORIAS = [
  { id: 1, nombre: "Nutrición Clínica" },
  { id: 2, nombre: "Nutrición Deportiva" },
  { id: 3, nombre: "Pérdida de Peso" },
];

const MAX_IMAGEN = 5 * 1024 * 1024;

const subirImagen = (blob: Blob) => AgregarArticuloController.uploadImage(blob);

export default function AgregarArticulo() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | null>(null);
  const [etiquetasTxt, setEtiquetasTxt] = useState("");
  const [contenido, setContenido] = useState<EditorContent>([]);
  const [portada, setPortada] = useState<{ blob: Blob; preview: string } | null>(null);
  const [portadaAlt, setPortadaAlt] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState<EstadoArticulo | null>(null);

  // Libera la URL temporal al cambiar la imagen o al salir de la página
  useEffect(() => {
    return () => {
      if (portada?.preview) URL.revokeObjectURL(portada.preview);
    };
  }, [portada?.preview]);

  const mostrarError = (mensaje: string) => {
    setError(mensaje);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onElegirPortada = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (!file) return;

    if (!file.type.startsWith("image/")) return mostrarError("El archivo debe ser una imagen");
    if (file.size > MAX_IMAGEN) return mostrarError("La imagen supera los 5 MB");

    try {
      const blob = await resizeImage(file);
      setPortada({ blob, preview: URL.createObjectURL(blob) });
      setError("");
    } catch {
      mostrarError("No se pudo procesar la imagen");
    }
  };

  const validar = (estado: EstadoArticulo): string | null => {
    if (titulo.trim().length < 10) return "El título debe tener al menos 10 caracteres";
    if (estado === "BORRADOR") return null;
    if (resumen.trim().length < 50) return "El resumen debe tener entre 50 y 160 caracteres";
    if (!categoriaId) return "Elige una categoría";
    if (!portada) return "Agrega una imagen de portada";
    if (portadaAlt.trim().length < 10) return "Describe la imagen de portada (texto alternativo)";
    if (blocksToText(contenido).length < 300) return "El artículo es demasiado corto (mínimo 300 caracteres)";
    return null;
  };

  const guardar = async (estado: EstadoArticulo) => {
    const problema = validar(estado);
    if (problema) return mostrarError(problema);

    setEnviando(estado);
    setError("");

    try {
      const imagenPortadaUrl = portada ? await subirImagen(portada.blob) : null;

      const etiquetas = [
        ...new Set(
          etiquetasTxt
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter(Boolean)
        ),
      ].slice(0, 8);

      const datos: ArticuloInput = {
        titulo: titulo.trim(),
        resumen: resumen.trim() || null,
        categoriaId,
        etiquetas,
        contenidoJson: contenido,
        imagenPortadaUrl,
        imagenPortadaAlt: portadaAlt.trim() || null,
        estado,
      };

      await AgregarArticuloController.crear(datos);
      Utils.swalSuccess(estado === "BORRADOR" ? "Borrador guardado" : "Artículo publicado");
      router.push("/articulos");
    } catch (e) {
      mostrarError(e instanceof Error ? e.message : "No se pudo guardar el artículo");
      setEnviando(null);
    }
  };

  const campo =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500";

  return (
    <div className="mx-auto px-3 py-3">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Crear nuevo artículo</h1>

      {error && (
        <div role="alert" className="mb-6 rounded border-l-4 border-red-500 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="space-y-4 lg:w-2/3">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={160}
            placeholder="Título del artículo"
            aria-label="Título"
            className={`${campo} text-xl font-semibold`}
          />
          <div className="rounded-lg border border-gray-300 py-2">
            <RichEditorClient
              onContentChange={setContenido}
              onUploadFile={async (file) => subirImagen(await resizeImage(file))}
            />
          </div>
        </div>

        <aside className="space-y-5 lg:w-1/3">
          <div>
            <label htmlFor="resumen" className="mb-1 block text-sm font-medium text-gray-700">
              Resumen para Google ({resumen.length}/160)
            </label>
            <textarea
              id="resumen"
              value={resumen}
              onChange={(e) => setResumen(e.target.value)}
              maxLength={160}
              rows={3}
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              id="categoria"
              value={categoriaId ?? ""}
              onChange={(e) => setCategoriaId(e.target.value ? Number(e.target.value) : null)}
              className={campo}
            >
              <option value="">Selecciona...</option>
              {CATEGORIAS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="etiquetas" className="mb-1 block text-sm font-medium text-gray-700">
              Etiquetas (separadas por coma, máx. 8)
            </label>
            <input
              id="etiquetas"
              value={etiquetasTxt}
              onChange={(e) => setEtiquetasTxt(e.target.value)}
              placeholder="carbohidratos, salud, dieta"
              className={campo}
            />
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium text-gray-700">Imagen de portada</span>
            {portada ? (
              <div className="space-y-2">
                <Image
                  src={portada.preview}
                  alt="Vista previa de la portada"
                  width={600}
                  height={315}
                  unoptimized
                  className="w-full rounded-md object-cover"
                />
                <input
                  value={portadaAlt}
                  onChange={(e) => setPortadaAlt(e.target.value)}
                  maxLength={160}
                  placeholder="Describe la imagen (texto alternativo)"
                  aria-label="Texto alternativo de la portada"
                  className={campo}
                />
                <button
                  type="button"
                  onClick={() => setPortada(null)}
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Cambiar imagen
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-sm text-gray-600 hover:border-green-500">
                <span className="font-medium text-green-600">Sube una imagen</span>
                <span className="text-xs text-gray-500">PNG, JPG o WebP hasta 5 MB (ideal 1200×630)</span>
                <input type="file" accept="image/*" className="sr-only" onChange={onElegirPortada} />
              </label>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/articulos")}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={enviando !== null}
              onClick={() => guardar("BORRADOR")}
              className="rounded-md border border-green-600 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-50"
            >
              {enviando === "BORRADOR" ? "Guardando..." : "Guardar borrador"}
            </button>
            <button
              type="button"
              disabled={enviando !== null}
              onClick={() => guardar("PUBLICADO")}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {enviando === "PUBLICADO" ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}