import { PerfilController } from "@/app/perfil/[id]/[rol]/perfilController";
import { Col, Image, Row } from "react-bootstrap";

export default async function PerfilPaciente({ id }) {
  const response = await PerfilController.getUser(id);
  const edad = await PerfilController.calcularEdad(response?.data?.tusuario_pacientes?.fecha_nacimiento);

  return (
    <>
      <h1>Perfil de Paciente</h1>
      <Row>
        <Col md={3}>
          {response?.data?.tusuario_pacientes?.foto ? (
            <Image src={`http://127.0.0.1:8080/api/v1/view/${response?.data?.tusuario_pacientes?.foto}`} alt={response?.data?.nombre} fluid roundedCircle />
          ) : (
            <i className="bx bxs-user-circle" style={{ color: "black", fontSize: "6rem", width: "100%", display: "block", textAlign: "center" }}></i>
          )}
        </Col>
        <Col md={9}>
          <h4>Nombre</h4>
          <h5>
            {response?.data?.nombre} {response?.data?.primer_apellido} {response?.data?.segundo_apellido}
          </h5>
          <h4>Correo</h4>
          <h5>{response?.data?.correo}</h5>
          <h4>Teléfono</h4>
          <h5>{response?.data?.tusuario_pacientes?.telefono}</h5>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <h4>Fecha de Nacimiento</h4>
          <h5>
            {new Date(response?.data?.tusuario_pacientes?.fecha_nacimiento).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h5>
          <h4>Edad</h4>
          <h5> {edad} años</h5>
        </Col>
        <Col md={4}>
          <h4>Estatura</h4>
          {response?.data?.tusuario_pacientes?.consulta?.length > 0 ? (
            <h5>{response?.data.tusuario_pacientes.consulta[response?.data.tusuario_pacientes.consulta.length - 1]?.estatura} m</h5>
          ) : (
            <h5>No hay datos de estatura</h5>
          )}
          <h4>Peso</h4>
          {response?.data?.tusuario_pacientes?.consulta?.length > 0 ? (
            <h5>{response?.data.tusuario_pacientes.consulta[response?.data.tusuario_pacientes.consulta.length - 1]?.peso} kg</h5>
          ) : (
            <h5>No hay datos de peso</h5>
          )}
        </Col>
        <Col md={4}>
          <h4>Sexo</h4>
          <h5>{response?.data?.tusuario_pacientes?.sexo}</h5>
        </Col>
      </Row>
    </>
  );
}
