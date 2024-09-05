"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/utils/axiosConfig";
import { Image } from "react-bootstrap";
import { Utils } from "@/app/utils/utils";

export default function Articulo() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [encabezado, setEncabezado] = useState("");
  const [contenidoSinEncabezado, setContenidoSinEncabezado] = useState("");

  useEffect(() => {
    if (id) {
      loadArticulo();
    }
  }, [id]);

  const loadArticulo = async () => {
    try {
      const response = await axiosInstance.get(`/articulo/${id}`);
      const articuloData = response.data.articulo;

      // Extraer el encabezado
      const titulo = extraerEncabezado(articuloData.contenido);
      setEncabezado(titulo);

      // Remover el primer encabezado del contenido
      const contenidoModificado = removerPrimerEncabezado(articuloData.contenido);
      setContenidoSinEncabezado(contenidoModificado);

      // Guardar el artículo completo
      setArticulo(articuloData);
      Utils.swalSuccess("Artículo cargado correctamente");
    } catch (error) {
      Utils.swalFailure("Error al cargar el artículo", error.message);
    }
  };

  const extraerEncabezado = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
    return heading ? heading.outerHTML : "No hay encabezado";
  };

  const removerPrimerEncabezado = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Eliminar el primer encabezado que se encuentra en el contenido
    const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
    if (heading) {
      heading.remove(); // Eliminar el primer encabezado del contenido
    }

    return doc.body.innerHTML; // Retornar el contenido sin el encabezado
  };

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
        <div className="col-sm-8 texto-justificado">
          <div dangerouslySetInnerHTML={{ __html: encabezado }} />
          <div dangerouslySetInnerHTML={{ __html: contenidoSinEncabezado }} />
          <p>
            Nutriólogo:{" "}
            <strong>
              {articulo.nutriologo.user.nombre} {articulo.nutriologo.user.primer_apellido} {articulo.nutriologo.user.segundo_apellido}
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
