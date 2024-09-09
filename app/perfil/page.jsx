"use client";
import { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import axiosInstance from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export default function Perfil() {
  const [rol, setRol] = useState(null);
  const [perfilData, setPerfilData] = useState([]);

  const handleDatosPerfil = () => {
    axiosInstance
      .get(`auth/user/${sessionStorage.getItem("id_user")}`)
      .then((response) => {
        setPerfilData(response.data);
        console.log(response.data);
      })
      .then(() => {
        Utils.swalSuccess("Datos de perfil cargados correctamente");
      })
      .catch((error) => {
        Utils.swalError("Error al cargar datos de perfil del administrador", error.message);
      });
  };

  useEffect(() => {
    const storedRol = parseInt(sessionStorage.getItem("trol_id"), 10);
    if (storedRol) {
      setRol(storedRol);
      handleDatosPerfil();
    }
  }, []);

  return (
    <Container>
      {rol === 1 ? (
        <>
          <h1>Perfil de Administrador</h1>
          <Row>
            <Col md={3}>{perfilData.data?.admin?.foto ? <Image src={perfilData.data?.admin?.foto} alt={perfilData.data.nombre} fluid roundedCircle /> : <i className="bx bxs-user-circle"></i>}</Col>
            <Col md={9}>
              <h4>Nombre</h4>
              <h5>
                {perfilData.data?.nombre} {perfilData.data?.primer_apellido} {perfilData.data?.segundo_apellido}
              </h5>
              <h4>Correo</h4>
              <h5>{perfilData.data?.correo}</h5>
              <h4>Teléfono</h4>
              <h5>{perfilData.data?.admin?.telefono}</h5>
            </Col>
          </Row>
        </>
      ) : rol === 2 ? (
        <>
          <h1>Perfil de Nutriólogo</h1>
          <Row>
            <Col md={3}>{perfilData.data?.nutriologo?.foto ? <Image src={perfilData.data.nutriologo?.foto} alt={perfilData.data?.nombre} fluid roundedCircle /> : <i className="bx bxs-user-circle"></i>}</Col>
            <Col md={9}>
              <h4>Nombre</h4>
              <h5>
                {perfilData.data?.nombre} {perfilData.data?.primer_apellido} {perfilData.data?.segundo_apellido}
              </h5>
              <h4>Correo</h4>
              <h5>{perfilData.data?.correo}</h5>
              <h4>Teléfono</h4>
              <h5>{perfilData.data?.nutriologo?.telefono}</h5>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Descripción</h4>
              <h5>{perfilData.data?.nutriologo?.descripcion}</h5>
              <h4>Dirección</h4>
              <h5>{perfilData.data?.nutriologo?.direccion}</h5>
            </Col>
            <Col md={6}>
              <h4>Cédula Profesional</h4>
              <h5>{perfilData.data?.nutriologo?.cedula_profesional}</h5>
            </Col>
          </Row>
        </>
      ) : rol === 3 ? (
        <>
          <h1>Perfil de Paciente</h1>
          <Row>
            <Col md={3}>{perfilData.data?.paciente?.foto ? <Image src={perfilData.data?.paciente?.foto} alt={perfilData.data?.nombre} fluid roundedCircle /> : <i className="bx bxs-user-circle"></i>}</Col>
            <Col md={9}>
              <h4>Nombre</h4>
              <h5>
                {perfilData.data?.nombre} {perfilData.data?.primer_apellido} {perfilData.data?.segundo_apellido}
              </h5>
              <h4>Correo</h4>
              <h5>{perfilData.data?.correo}</h5>
              <h4>Teléfono</h4>
              <h5>{perfilData.data?.paciente?.telefono}</h5>
            </Col>
          </Row>
        </>
      ) : (
        <h1>Cargando datos de perfil...</h1>
      )}
    </Container>
  );
}
