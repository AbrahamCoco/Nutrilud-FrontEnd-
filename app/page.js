"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "@/app/utils/axiosConfig";
import { Carousel, Image } from "react-bootstrap";
import { Utils } from "@/app/utils/utils";

export default function Home() {
  const [articulos, setArticulos] = useState([]);
  const [primerEncabezado, setPrimerEncabezado] = useState({});

  useEffect(() => {
    loadArticulos();
  }, []); // Ejecutar solo una vez al montar el componente

  const loadArticulos = async () => {
    try {
      const response = await axiosInstance.get("/");
      setArticulos(response.data.articulos);

      const encabezados = response.data.articulos.reduce((acc, articulo) => {
        const encabezado = extraerPrimerEncabezado(articulo.contenido);
        acc[articulo.id] = encabezado;
        return acc;
      }, {});

      setPrimerEncabezado(encabezados);
      Utils.swalSuccess("Artículos cargados correctamente");
    } catch (error) {
      Utils.swalFailure("Error al cargar los artículos", error.message);
    }
  };

  const extraerPrimerEncabezado = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const heading = doc.querySelector("h1, h2, h3, h4, h5, h6");
    return heading ? heading.outerHTML : "No hay encabezado";
  };

  return (
    <>
      <Carousel>
        {articulos.map((articulo, index) => (
          <Carousel.Item key={articulo.id}>
            <Link href={`/articulo/${articulo.id}`}>
              <Image src={articulo.foto} className="d-block w-100" alt={primerEncabezado[articulo.id]} />
              <Carousel.Caption>
                <div dangerouslySetInnerHTML={{ __html: primerEncabezado[articulo.id] }} />
                <p>
                  <small className="text-muted">
                    Publicado el{" "}
                    {new Date(articulo.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                </p>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="container">
        <h1>Artículos Nutricionales</h1>
        <div className="row">
          {articulos.map((articulo) => (
            <div className="col-md-4 mb-4" key={articulo.id}>
              <div className="card">
                <div className="card-body">
                  <Link href={`/articulo/${articulo.id}`}>
                    <div dangerouslySetInnerHTML={{ __html: primerEncabezado[articulo.id] }} />
                  </Link>
                  <p className="card-text">
                    <small className="text-muted">
                      Publicado el{" "}
                      {new Date(articulo.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
