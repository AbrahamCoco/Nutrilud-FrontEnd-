import { PerfilController } from "@/app/perfil/perfilController";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function PerfilPaciente() {
  const [perfilData, setPerfilData] = useState(null);
  const [edad, setEdad] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const handlePerfil = async () => {
      try {
        const response = await PerfilController.getUser(sessionStorage.getItem("id"));
        if (isMounted) {
          setPerfilData(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setPerfilData(null);
        }
      }
    };

    if (perfilData?.data?.paciente?.fecha_nacimiento) {
      setEdad(PerfilController.calcularEdad(perfilData?.data?.paciente?.fecha_nacimiento));
    }

    handlePerfil();

    return () => {
      isMounted = false;
    };
  }, [perfilData?.data?.paciente?.fecha_nacimiento]);

  return (
    <>
      <h1>Perfil de Paciente</h1>
      <Row>
        <Col md={3}>
          {perfilData?.data?.tusuario_pacientes?.foto ? (
            <Image src={perfilData?.data?.tusuario_pacientes?.foto} alt={perfilData?.data?.nombre} fluid roundedCircle />
          ) : (
            <i className="bx bxs-user-circle" style={{ color: "black", fontSize: "6rem", width: "100%", display: "block", textAlign: "center" }}></i>
          )}
        </Col>
        <Col md={9}>
          <h4>Nombre</h4>
          <h5>
            {perfilData?.data?.nombre} {perfilData?.data?.primer_apellido} {perfilData?.data?.segundo_apellido}
          </h5>
          <h4>Correo</h4>
          <h5>{perfilData?.data?.correo}</h5>
          <h4>Teléfono</h4>
          <h5>{perfilData?.data?.tusuario_pacientes?.telefono}</h5>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <h4>Fecha de Nacimiento</h4>
          <h5>
            {new Date(perfilData?.data?.tusuario_pacientes?.fecha_nacimiento).toLocaleDateString("es-ES", {
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
          {perfilData?.data?.tusuario_pacientes?.consulta?.length > 0 ? (
            <h5>{perfilData?.data.tusuario_pacientes.consulta[perfilData?.data.tusuario_pacientes.consulta.length - 1]?.estatura} m</h5>
          ) : (
            <h5>No hay datos de estatura</h5>
          )}
          <h4>Peso</h4>
          {perfilData?.data?.tusuario_pacientes?.consulta?.length > 0 ? (
            <h5>{perfilData?.data.tusuario_pacientes.consulta[perfilData?.data.tusuario_pacientes.consulta.length - 1]?.peso} kg</h5>
          ) : (
            <h5>No hay datos de peso</h5>
          )}
        </Col>
        <Col md={4}>
          <h4>Sexo</h4>
          <h5>{perfilData?.data?.tusuario_pacientes?.sexo}</h5>
        </Col>
      </Row>
    </>
  );
}
