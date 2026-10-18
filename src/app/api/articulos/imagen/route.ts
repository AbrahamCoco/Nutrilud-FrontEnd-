import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(req: Request) {
    const baseURL: string = "http://localhost:8080/api/v1";
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) {
        return NextResponse.json({ success: false, message: "No autorizado" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
        return NextResponse.json({ success: false, message: "Falta el archivo" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
        return NextResponse.json({ success: false, message: "La imagen supera los 5 MB" }, { status: 413 });
    }

    const fd = new FormData();
    fd.append("file", file, "image");

    const res = await fetch(`${baseURL}/tarticulos/uploadImage`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(
        data ?? { success: false, message: "Respuesta inválida del servidor" },
        { status: res.status }
    );
}