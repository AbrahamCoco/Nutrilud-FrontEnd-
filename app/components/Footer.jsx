import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="footer py-4 bg-success bg-gradient text-light mt-auto">
      <Row className="justify-content-center">
        <Col md={4} sm={12} className="text-center text-md-start">
          <h5>Información de contacto:</h5>
          <ul className="list-unstyled">
            <li>
              Teléfono:{" "}
              <strong>
                <Link href={`https://wa.me/2462653921`} target="_blank" rel="noopener noreferrer" className="text-light">
                  246 265 3921 <BsWhatsapp />
                </Link>
              </strong>
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
              <a href="https://www.facebook.com/NutriLud" className="text-light">
                <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/nutrilud/" className="text-light">
                <FaInstagram /> Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-light">
                <FaTwitter /> Twitter
              </a>
            </li>
          </ul>
        </Col>
        <Col md={4} sm={12} className="text-center text-md-end">
          <h5>Recursos útiles:</h5>
          <ul className="list-unstyled">
            <li>
              <Link href="/nutriologo/recursos" className="text-light">
                Recursos de nutrición
              </Link>
            </li>
            <li>
              <Link href="/nutriologo/guias" className="text-light">
                Guías de alimentación saludable
              </Link>
            </li>
            <li>
              <Link href="/nutriologo/estilos" className="text-light">
                Información sobre estilos de vida activos
              </Link>
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
    </footer>
  );
}
