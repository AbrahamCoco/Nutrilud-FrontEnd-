import sanitizeHtml from "sanitize-html";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { ArticuloInput } from "@/interfaces/articulo";
import { ServerBlockNoteEditor } from "@blocknote/server-util";

export const runtime = "nodejs";

const PROHIBIDAS = new Set(["__proto__", "constructor", "prototype"]);
const limpiarJson = (input: unknown) =>
  JSON.parse(JSON.stringify(input), (k, v) => (PROHIBIDAS.has(k) ? undefined : v));

const SANITIZE: sanitizeHtml.IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "h1", "h2", "h3", "figure", "figcaption"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading"],
  },
  allowedSchemes: ["https", "http", "mailto"], // quita "http" en producción
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
  },
};

export async function POST(req: Request) {
  const baseURL: string = "http://localhost:8080/api/v1";
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
  }

  const body = (await req.json()) as ArticuloInput;
  if (!Array.isArray(body.contenidoJson)) {
    return NextResponse.json({ success: false, message: "Datos inválidos" }, { status: 400 });
  }

  const contenidoJson = limpiarJson(body.contenidoJson);
  const editor = ServerBlockNoteEditor.create();
  const html = await editor.blocksToHTMLLossy(contenidoJson);
  const contenidoHtml = sanitizeHtml(html, SANITIZE);

  const res = await fetch(`${baseURL}/tarticulos/insert`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...body, contenidoJson, contenidoHtml }),
  });

  const data = await res.json().catch(() => null);
  return NextResponse.json(
    data ?? { success: false, message: "Respuesta inválida del servidor" },
    { status: res.status }
  );
}