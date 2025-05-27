import { Image } from "react-bootstrap";
import { ArticuloController } from "./articuloController";

export default async function Articulo({ params }) {
  const { id } = await params;
  const { articuloData, titulo, contenidoModificado } =
    await ArticuloController.getArticulo(id);

  return (
    <div className="mx-auto">
      <article className="prose prose-green max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          {titulo}
        </h1>

        <div className="mb-8 text-justify">
          <div
            dangerouslySetInnerHTML={{ __html: contenidoModificado }}
            className="editor-content"
          />
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-700">Nutriólogo:</p>
              <p className="text-green-800 font-semibold">
                {articuloData.tusuario_nutriologo.nombre}{" "}
                {articuloData.tusuario_nutriologo.primer_apellido}{" "}
                {articuloData.tusuario_nutriologo.segundo_apellido}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Fecha de publicación:</p>
              <p className="text-green-800">
                {new Date(
                  articuloData.created_at.split(" ")[0]
                ).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
