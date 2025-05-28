"use client";
import Link from "next/link";
import { Card, Col } from "react-bootstrap";
import { Tarjet } from "../utils/axiosConfig";

export default function ArticulosCard({ articulos, primerEncabezado }) {
  return (
    <>
      {articulos.map((articulo) => (
        <Col md={4} className="py-2" key={articulo.id}>
          <Card>
            <Card.Img variant="top" src={`${Tarjet.view}${articulo.foto.replace(/\\/g, "/")}`} />
            <Card.Body>
              <Card.Title>
                <Link href={`/articulo/${articulo.id}`}>{primerEncabezado[articulo.id]}</Link>
              </Card.Title>
              <Card.Text>
                <small className="text-muted">
                  Publicado el{" "}
                  {new Date(articulo.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}
