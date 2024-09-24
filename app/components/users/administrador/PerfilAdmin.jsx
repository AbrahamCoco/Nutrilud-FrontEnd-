import { Col, Image, Row } from "react-bootstrap";

export default function PerfilAdmin({ perfilData }) {
  console.log("perfilData en PerfilAdmin:", perfilData); // Verifica el contenido

  if (!perfilData || !perfilData.admin) {
    return <h1>Cargando datos de perfil...</h1>; // Mostrar si aún no ha llegado el perfil
  }

  return (
    <>
      <h1>Perfil de Administrador</h1>
      <Row>
        <Col md={3}>
          {perfilData.admin.foto ? (
            <Image src={perfilData.admin.foto} alt={perfilData.nombre} fluid roundedCircle />
          ) : (
            <i
              className="bx bxs-user-circle"
              style={{
                color: "black",
                fontSize: "6rem",
                width: "100%",
                display: "block",
                textAlign: "center",
              }}></i>
          )}
        </Col>
        <Col md={9}>
          <h4>Nombre</h4>
          <h5>
            {perfilData.nombre} {perfilData.primer_apellido} {perfilData.segundo_apellido}
          </h5>
          <h4>Correo</h4>
          <h5>{perfilData.correo}</h5>
          <h4>Teléfono</h4>
          <h5>{perfilData.admin?.telefono}</h5>
        </Col>
      </Row>
    </>
  );
}
