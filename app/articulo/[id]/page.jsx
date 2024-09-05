"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/utils/axiosConfig";
import { Image } from "react-bootstrap";

export default function Articulo() {
  const { id } = useParams(); // Acceder directamente a 'id' desde useParams
  const [articulo, setArticulo] = useState(null);

  useEffect(() => {
    if (id) {
      loadArticulo();
    }
  }, [id]);

  const loadArticulo = async () => {
    try {
      const response = await axiosInstance.get(`articulo/${id}`);
      setArticulo(response.data.articulo);
    } catch (error) {
      console.log(error);
    }
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
          <Image src={articulo.foto} className="d-block w-100" alt={articulo.titulo} />
          <ReactQuill value={articulo.titulo} readOnly={true} theme="bubble" className="title-article" style={{ fontSize: "2em" }} />
          <ReactQuill value={articulo.contenido} readOnly={true} theme="bubble" className="container-article" />
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
      </div>
    </div>
  );
}
