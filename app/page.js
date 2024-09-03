"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactQuill from "react-quill";

export default function Home() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    loadArticulos();
  }, []);

  const loadArticulos = async () => {
    try {
      const response = await axios.get("/api/v1/");
      setArticulos(response.data.articulos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="carousel slide" id="carouselExampleCaptions">
        <div className="carousel-indicators">
          {articulos.map((articulo, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-href={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {articulos.map((articulo, index) => (
            <div
              key={articulo.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <Link href={`/articulo/${articulo.id}`}>
                {/* <img
                  src={articulo.foto}
                  className="d-block w-100"
                  alt={articulo.titulo}
                /> */}
                <div className="carousel-caption d-none d-md-block">
                  <ReactQuill
                    value={articulo.titulo}
                    readOnly={true}
                    theme="bubble"
                    className="title-article"
                    style={{
                      fontSize: "1em",
                      color: "black",
                      textAlign: "center !important",
                    }}
                  />
                  <p>
                    <small className="text-muted">
                      Publicado el{" "}
                      {new Date(
                        articulo.created_at.split(" ")[0]
                      ).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="carousel-control-prev"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          type="button"
          className="carousel-control-next"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
      <div className="container">
        <h1>Artículos Nutricionales</h1>
        <div className="row">
          {articulos.map((articulo) => (
            <div className="col-md-4 mb-4" key={articulo.id}>
              <div className="card">
                <div className="card-body">
                  <Link href={`/articulo/${articulo.id}`}>
                    <ReactQuill
                      value={articulo.titulo}
                      readOnly={true}
                      theme="bubble"
                      className="title-article"
                      style={{ fontSize: "0.7em" }}
                    />
                  </Link>
                  <p className="card-text">
                    <small className="text-muted">
                      Publicado el{" "}
                      {new Date(
                        articulo.created_at.split(" ")[0]
                      ).toLocaleDateString("es-ES", {
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
