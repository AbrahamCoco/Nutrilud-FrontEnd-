import type { Articulo } from "@/interfaces/articulo";

const API_URL = "http://localhost:8080/api";

interface ApiResponse<T> {
    success?: boolean;
    message?: string;
    data: T;
}

export async function obtenerArticulos(page = 0): Promise<Articulo[]> {
    const res = await fetch(`${API_URL}/v1/tarticulos/findAllArticles?page=${page}`, {
        next: { revalidate: 60, tags: ["articulos"] },
    });
    if (!res.ok) throw new Error(`El servidor respondió ${res.status}`);

    const json = (await res.json()) as ApiResponse<Articulo[]>;
    return json.data ?? [];
}

export async function obtenerArticuloPorSlug(slug: string): Promise<Articulo | null> {
    if (!API_URL) throw new Error("Falta la variable API_URL");

    const res = await fetch(
        `${API_URL}/v1/tarticulos/findBySlug?slug=${encodeURIComponent(slug)}`,
        { next: { revalidate: 60, tags: ["articulos", `articulo-${slug}`] } }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`El servidor respondió ${res.status}`);

    const json = (await res.json()) as ApiResponse<Articulo | null>;
    return json.data ?? null;
}