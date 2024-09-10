import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer py-4 bg-success bg-gradient text-light mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Información de contacto:</h5>
            <ul className="list-unstyled">
              <li>
                Telefono: <strong>246 265 3921</strong>
              </li>
              <li>
                Email: <strong>info@nutrilud.com o karinetza09@gmail.com</strong>
              </li>
              <li>
                Horario de consultas: <strong>Lunes a Viernes de 9:00 A.M. a 5:00 P.M.</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center">
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
          </div>
          <div className="col-md-4 text-end">
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
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="text-light">© {new Date().getFullYear()} NutriLud. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
