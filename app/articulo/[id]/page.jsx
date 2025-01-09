"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Image } from "react-bootstrap";
import { ArticuloController } from "./articuloController";

export default function Articulo() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [encabezado, setEncabezado] = useState("");
  const [contenidoSinEncabezado, setContenidoSinEncabezado] = useState("");

  useEffect(() => {
    const loadArticulo = async () => {
      const response = await ArticuloController.getArticulo(id);

      if (response) {
        setEncabezado(response.titulo);
        setContenidoSinEncabezado(response.contenidoModificado);
        setArticulo(response.articuloData);
      } else {
        setArticulo(null);
        setContenidoSinEncabezado("");
        setEncabezado("");
      }
    };

    loadArticulo();
  }, [id]);

  if (!articulo) {
    return (
      <div className="container">
        <h1>Cargando artículo...</h1>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-sm-8 text-justify">
          <div dangerouslySetInnerHTML={{ __html: encabezado }} />
          <div dangerouslySetInnerHTML={{ __html: contenidoSinEncabezado }} />
          <p>
            Nutriólogo:{" "}
            <strong>
              {articulo.tusuario_nutriologo.nombre} {articulo.tusuario_nutriologo.primer_apellido} {articulo.tusuario_nutriologo.segundo_apellido}
            </strong>
          </p>
          <p>
            Fecha de publicación:{" "}
            {new Date(articulo.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="col-sm-4">
          <Image src={articulo.foto} className="d-block w-100" alt={encabezado} />
        </div>
      </div>
    </div>
  );
}
