import { PerfilController } from "@/app/perfil/perfilController";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function PerfilNutriologo() {
  const [perfilData, setPerfilData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const handlePerfil = async () => {
      try {
        const response = await PerfilController.getUser(sessionStorage.getItem("id_user"));
        if (isMounted) {
          setPerfilData(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setPerfilData(null);
        }
      }
    };

    handlePerfil();

    return () => {
      isMounted = false; // Cleanup: Evita actualizar el estado si el componente se desmonta
    };
  }, []);

  return (
    <>
      <h1>Perfil de Nutriólogo</h1>
      <Row>
        <Col md={3}>
          {perfilData?.data?.nutriologo?.foto ? (
            <Image src={perfilData?.data.nutriologo?.foto} alt={perfilData?.data?.nombre} fluid roundedCircle />
          ) : (
            <i className="bx bxs-user-circle" style={{ color: "black", fontSize: "15rem", width: "100%", display: "block", textAlign: "center" }}></i>
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
          <h5>{perfilData?.data?.nutriologo?.telefono}</h5>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>Descripción</h4>
          <h5>{perfilData?.data?.nutriologo?.descripcion}</h5>
          <h4>Dirección</h4>
          <h5>{perfilData?.data?.nutriologo?.direccion}</h5>
        </Col>
        <Col md={6}>
          <h4>Cédula Profesional</h4>
          <h5>{perfilData?.data?.nutriologo?.cedula_profesional}</h5>
        </Col>
      </Row>
    </>
  );
}
