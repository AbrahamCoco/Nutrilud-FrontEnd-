import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer py-4 bg-success bg-gradient text-light mt-auto">
      <Container>
        <Row className="justify-content-center">
          <Col md={4} sm={12} className="text-center text-md-start">
            <h5>Información de contacto:</h5>
            <ul className="list-unstyled">
              <li>
                Teléfono: <strong>246 265 3921</strong>
              </li>
              <li>
                Email: <strong>info@nutrilud.com o karinetza09@gmail.com</strong>
              </li>
              <li>
                Horario de consultas: <strong>Lunes a Viernes de 9:00 A.M. a 5:00 P.M.</strong>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12} className="text-center">
            <h5>Redes sociales:</h5>
            <ul className="list-unstyled">
              <li>
                <FaFacebook />{" "}
                <a href="https://www.facebook.com/NutriLud" className="text-light">
                  Facebook
                </a>
              </li>
              <li>
                <FaInstagram />{" "}
                <a href="https://www.instagram.com/nutrilud/" className="text-light">
                  Instagram
                </a>
              </li>
              <li>
                <FaTwitter />{" "}
                <a href="#" className="text-light">
                  Twitter
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} sm={12} className="text-center text-md-end">
            <h5>Recursos útiles:</h5>
            <ul className="list-unstyled">
              <li>
                <a href="[Enlace a recursos de nutrición]" className="text-light">
                  Recursos de nutrición
                </a>
              </li>
              <li>
                <a href="[Enlace a guías de alimentación saludable]" className="text-light">
                  Guías de alimentación saludable
                </a>
              </li>
              <li>
                <a href="[Enlace a información sobre estilos de vida activos]" className="text-light">
                  Información sobre estilos de vida activos
                </a>
              </li>
            </ul>
          </Col>
          <Col md={12} className="text-center">
            NutriLud {new Date().getFullYear()} &copy; Todos los derechos reservados | Desarrollado por{" "}
            <a href="https://github.com/DevConMx" className="text-light" target="_blank">
              DevConMx
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
