import PerfilAdmin from "@/app/components/users/administrador/PerfilAdmin";
import PerfilNutriologo from "@/app/components/users/nutriologo/PerfilNutriologo";
import PerfilPaciente from "@/app/components/users/paciente/PerfilPaciente";
import "boxicons/css/boxicons.min.css";
import { Container } from "react-bootstrap";

export default async function Perfil({ params }) {
  let { id } = await params;
  let { rol } = await params;

  id = parseInt(id, 10);
  rol = parseInt(rol, 10);
  switch (rol) {
    case 1:
      return (
        <Container>
          <PerfilAdmin id={id} />
        </Container>
      );
    case 2:
      return (
        <Container>
          <PerfilNutriologo id={id} />
        </Container>
      );
    case 3:
      return (
        <Container>
          <PerfilPaciente id={id} />
        </Container>
      );
    default:
      return (
        <Container>
          <h1>Cargando datos de perfil...</h1>
        </Container>
      );
  }
}
