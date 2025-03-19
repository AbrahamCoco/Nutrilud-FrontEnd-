import { Image } from "react-bootstrap";
import { ArticuloController } from "./articuloController";

export default async function Articulo({ params }) {
  const { id } = await params;
  const { articuloData, titulo, contenidoModificado } = await ArticuloController.getArticulo(id);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-12 text-justify">
          <h1>{titulo}</h1>
          <div dangerouslySetInnerHTML={{ __html: contenidoModificado }} />
          <p>
            Nutriólogo:{" "}
            <strong>
              {articuloData.tusuario_nutriologo.nombre} {articuloData.tusuario_nutriologo.primer_apellido} {articuloData.tusuario_nutriologo.segundo_apellido}
            </strong>
          </p>
          <p>
            Fecha de publicación:{" "}
            {new Date(articuloData.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
