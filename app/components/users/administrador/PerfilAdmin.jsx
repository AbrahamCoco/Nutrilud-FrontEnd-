import { PerfilController } from "@/app/perfil/[id]/[rol]/perfilController";
import { Col, Image, Row } from "react-bootstrap";

export default async function PerfilAdmin({ id }) {
  const response = await PerfilController.getUser(id);

  return (
    <>
      <h1>Perfil de Administrador</h1>
      <Row>
        <Col md={3}>
          {response?.data.tusuario_admins.foto ? (
            <Image src={response?.data.tusuario_admins.foto} alt={response?.data.nombre} fluid roundedCircle />
          ) : (
            <i className="bx bxs-user-circle" style={{ color: "black", fontSize: "6rem", width: "100%", display: "block", textAlign: "center" }}></i>
          )}
        </Col>
        <Col md={9}>
          <h4>Nombre</h4>
          <h5>
            {response?.data.nombre} {response?.data.primer_apellido} {response?.data.segundo_apellido}
          </h5>
          <h4>Correo</h4>
          <h5>{response?.data.correo}</h5>
          <h4>Teléfono</h4>
          <h5>{response?.data.tusuario_admins.telefono}</h5>
        </Col>
      </Row>
    </>
  );
}
