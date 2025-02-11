import { PerfilController } from "@/app/perfil/perfilController";
import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function PerfilAdmin() {
  const [perfilData, setPerfilData] = useState(null);

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

    handlePerfil();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h1>Perfil de Administrador</h1>
      <Row>
        <Col md={3}>
          {perfilData?.data.tusuario_admins.foto ? (
            <Image src={perfilData?.data.tusuario_admins.foto} alt={perfilData?.data.nombre} fluid roundedCircle />
          ) : (
            <i className="bx bxs-user-circle" style={{ color: "black", fontSize: "6rem", width: "100%", display: "block", textAlign: "center" }}></i>
          )}
        </Col>
        <Col md={9}>
          <h4>Nombre</h4>
          <h5>
            {perfilData?.data.nombre} {perfilData?.data.primer_apellido} {perfilData?.data.segundo_apellido}
          </h5>
          <h4>Correo</h4>
          <h5>{perfilData?.data.correo}</h5>
          <h4>Teléfono</h4>
          <h5>{perfilData?.data.tusuario_admins.telefono}</h5>
        </Col>
      </Row>
    </>
  );
}
