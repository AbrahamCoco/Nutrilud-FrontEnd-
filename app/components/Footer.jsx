import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contactInfo = [
    { label: "Teléfono", value: "246 265 3921", link: "https://wa.me/2462653921", icon: <BsWhatsapp /> },
    { label: "Email", value: "info@nutrilud.com o karinetza09@gmail.com" },
    { label: "Horario de consultas", value: "Lunes a Viernes de 9:00 A.M. a 5:00 P.M." },
  ];
  const socialLinks = [
    { href: "https://www.facebook.com/NutriLud", icon: <FaFacebook />, label: "Facebook" },
    { href: "https://www.instagram.com/nutrilud/", icon: <FaInstagram />, label: "Instagram" },
    { href: "#", icon: <FaTwitter />, label: "Twitter" },
  ];
  const resourcesLinks = [
    { href: "/nutriologo/recursos", label: "Recursos de nutrición" },
    { href: "/nutriologo/guias", label: "Guías de alimentación saludable" },
    { href: "/nutriologo/estilos", label: "Información sobre estilos de vida activos" },
  ];

  return (
    <footer className="footer py-4 bg-success bg-gradient text-light mt-auto">
      <Row className="justify-content-center">
        <Col md={4} sm={12} className="text-center text-md-start">
          <h5>Información de contacto:</h5>
          <ul className="list-unstyled">
            {contactInfo.map((info, index) => (
              <li key={index}>
                {info.label}:{" "}
                <strong>
                  {info.link ? (
                    <Link href={info.link} target="_blank" rel="noopener noreferrer" className="text-light">
                      {info.value} {info.icon}
                    </Link>
                  ) : (
                    info.value
                  )}
                </strong>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={4} sm={12} className="text-center">
          <h5>Redes sociales:</h5>
          <ul className="list-unstyled">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-light">
                  {link.icon} {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={4} sm={12} className="text-center text-md-end">
          <h5>Recursos útiles:</h5>
          <ul className="list-unstyled">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-light">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={12} className="text-center">
          NutriLud {currentYear} &copy; Todos los derechos reservados | Desarrollado por{" "}
          {/* <a href="https://github.com/DevConMx" className="text-light" target="_blank">
            DevConMx
          </a> */}
        </Col>
      </Row>
    </footer>
  );
}
