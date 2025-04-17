import { Col, Container, Row } from "react-bootstrap";
import ArticulosCard from "./components/ArticulosCard";
import ArticulosCarousel from "./components/ArticulosCarousel";
import { IndexController } from "./indexController";

export default async function Home() {
  const { articulos, primerEncabezado } = await IndexController.getArticulos();

  if (!articulos || articulos.length === 0) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h1>Todavia no hay articulos nutricionales disponibles</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  const ultimosArticulos = articulos.slice(-5);

  return (
    <>
      <ArticulosCarousel articulos={ultimosArticulos} primerEncabezado={primerEncabezado} />
      <div className="container">
        <h1>Artículos Nutricionales</h1>
        <div className="row">
          <ArticulosCard articulos={articulos} primerEncabezado={primerEncabezado} />
        </div>
      </div>
    </>
  );
}
