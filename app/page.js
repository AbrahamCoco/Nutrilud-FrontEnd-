"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Carousel, Image } from "react-bootstrap";
import { IndexController } from "./indexController";

export default function Home() {
  const [articulos, setArticulos] = useState([]);
  const [primerEncabezado, setPrimerEncabezado] = useState({});

  useEffect(() => {
    loadArticulos();
  }, []); // Ejecutar solo una vez al montar el componente

  const loadArticulos = async () => {
    try {
      const { response, encabezados } = await IndexController.getArticulos();

      if (response && response.data && Array.isArray(response.data.data)) {
        setArticulos(response.data.data);
        setPrimerEncabezado(encabezados);
      } else {
        setArticulos([]);
        setPrimerEncabezado({});
      }
    } catch (error) {
      setArticulos([]);
      setPrimerEncabezado({});
    }
  };

  return (
    <>
      <Carousel>
        {articulos.map((articulo, index) => (
          <Carousel.Item key={articulo.id}>
            <Link href={`/articulo/${articulo.id}`}>
              <Image src={`http://127.0.0.1:8080/api/v1/view/${articulo.foto}`} className="d-block w-100" alt={primerEncabezado[articulo.id]} />
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
