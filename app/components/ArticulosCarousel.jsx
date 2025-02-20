"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function ArticulosCarousel({ articulos, primerEncabezado }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);
  return (
    <div id="articulosCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {articulos.map((articulo, index) => (
          <div key={articulo.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <Link href={`/articulo/${articulo.id}`}>
              <img src={`http://127.0.0.1:8080/api/v1/view/${articulo.foto}`} className="d-block w-100" alt={primerEncabezado[articulo.id]} />
              <div className="carousel-caption d-none d-md-block">
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
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#articulosCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#articulosCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
