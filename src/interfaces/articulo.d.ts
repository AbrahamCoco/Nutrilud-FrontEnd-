import type { PartialBlock } from "@blocknote/core";

export type EstadoArticulo = "BORRADOR" | "PUBLICADO";

export interface AutorArticulo {
  id: number;
  nombreCompleto: string;
  cedulaProfesional: string;
  fotoUrl: string;
  especialidad: string;
  biografiaCorta: string;
  agendaUrl: string;
}

/** Lo que devuelve la API (coincide con ArticulosBean de Spring) */
export interface Articulo {
  id: number;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenidoHtml?: string; // solo viene en el detalle, ya sanitizado
  imagenPortadaUrl: string | null;
  imagenPortadaAlt: string | null;
  categoria: string | null;
  categoriaSlug: string | null;
  etiquetas: string[];
  tiempoLecturaMin: number;
  estado: EstadoArticulo;
  fechaPublicacion: string | null; // "2026-10-17T13:05:09.123"
  fechaActualizacion: string | null;
  nameNutriologo: string;
  autorId?: number;
  autorCedula?: string;
  autorEspecialidad?: string | null;
  autorBiografia?: string | null;
  autorFoto?: string | null;
}

/** Lo que envía el cliente (escritura) */
export interface ArticuloInput {
  titulo: string;
  resumen: string | null;
  categoriaId: number | null;
  etiquetas: string[];
  contenidoJson: PartialBlock[];
  imagenPortadaUrl: string | null;
  imagenPortadaAlt: string | null;
  estado: EstadoArticulo;
}