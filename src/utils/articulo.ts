import type { PartialBlock } from "@blocknote/core";

export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function inlineText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map(inlineText).join(" ");
  if (content && typeof content === "object") {
    const c = content as {
      text?: string;
      content?: unknown;
      rows?: { cells: unknown[] }[];
    };
    if (typeof c.text === "string") return c.text;
    if (c.content) return inlineText(c.content);
    if (c.rows) return c.rows.flatMap((r) => r.cells).map(inlineText).join(" ");
  }
  return "";
}

export function blocksToText(blocks: PartialBlock[]): string {
  return blocks
    .map(
      (b) =>
        `${inlineText(b.content)} ${blocksToText((b.children ?? []) as PartialBlock[])}`
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tiempoLectura(blocks: PartialBlock[]): number {
  const palabras = blocksToText(blocks).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(palabras / 200));
}