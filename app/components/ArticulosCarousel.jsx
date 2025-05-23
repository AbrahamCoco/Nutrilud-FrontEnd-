"use client";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-bootstrap";
import { Tarjet } from "../utils/axiosConfig";

export default function ArticulosCarousel({ articulos, primerEncabezado }) {
  return (
    <Carousel>
      {articulos.map((articulo) => (
        <Carousel.Item key={articulo.id}>
          <Link href={`/articulo/${articulo.id}`}>
            <Image src={`${Tarjet.view}${articulo.foto.replace(/\\/g, "/")}`} fill className="d-block w-100" style={{ objectFit: "cover" }} alt={primerEncabezado[articulo.id]} />
            <Carousel.Caption style={{ background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)" }}>
              <div dangerouslySetInnerHTML={{ __html: primerEncabezado[articulo.id] }} />
              <p>
                <small>
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
  );
}
