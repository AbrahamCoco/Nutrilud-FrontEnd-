export async function resizeImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            const maxWidth = 800;
            const maxHeight = 400;
            const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);

            const canvas = document.createElement("canvas");
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("No se pudo obtener el contexto del canvas"));
                return;
            }

            // 👈 mejora calidad del redimensionado
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Error al convertir canvas a Blob"));
                        return;
                    }
                    resolve(blob);
                },
                "image/webp",
                0.8
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Error al cargar la imagen"));
        };
    });
}