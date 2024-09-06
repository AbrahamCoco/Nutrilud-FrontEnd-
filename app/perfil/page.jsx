"use client";
import { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import axiosInstance from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export default function Perfil() {
  const [rol, setRol] = useState(null);
  const [perfilData, setPerfilData] = useState([]);

  const handleDatosPerfil = (storedRol) => {
    if (storedRol === 1) {
      axiosInstance
        .get(`auth/user/${sessionStorage.getItem("admin_id")}`)
        .then((response) => {
          setPerfilData(response.data);
        })
        .then(() => {
          Utils.swalSuccess("Datos de perfil cargados correctamente");
        })
        .catch((error) => {
          Utils.swalError("Error al cargar datos de perfil del administrador", error.message);
        });
    } else if (storedRol === 2) {
      axiosInstance
        .get(`auth/user/${sessionStorage.getItem("nutriologo_id")}`)
        .then((response) => {
          setPerfilData(response.data);
          console.log(response.data);
        })
        .then(() => {
          Utils.swalSuccess("Datos de perfil cargados correctamente");
        })
        .catch((error) => {
          Utils.swalError("Error al cargar datos de perfil del nutriologo", error.message);
        });
    } else if (storedRol === 3) {
      axiosInstance
        .get(`auth/user/${sessionStorage.getItem("paciente_id")}`)
        .then((response) => {
          setPerfilData(response.data);
        })
        .then(() => {
          Utils.swalSuccess("Datos de perfil cargados correctamente");
        })
        .catch((error) => {
          Utils.swalError("Error al cargar datos de perfil del paciente", error.message);
        });
    }
  };

  useEffect(() => {
    const storedRol = parseInt(sessionStorage.getItem("trol_id"), 10);
    if (storedRol) {
      setRol(storedRol);
      handleDatosPerfil(storedRol);
    }
  }, []);

  return (
    <Container>
      {rol === 1 ? (
        <>
          <h1>Perfil de Administrador</h1>
        </>
      ) : rol === 2 ? (
        <>
          <h1>Perfil de Nutriólogo</h1>
          <Row>
            <Col md={3}>
              <Image src={perfilData.data.foto} alt={perfilData.data.user?.nombre} fluid roundedCircle />
            </Col>
            <Col md={9}>
              <h4>Nombre</h4>
              <h5>
                {perfilData.data.user?.nombre} {perfilData.data.user?.primer_apellido} {perfilData.data.user?.segundo_apellido}
              </h5>
              <h4>Correo</h4>
              <h5>{perfilData.data.user?.correo}</h5>
              <h4>Teléfono</h4>
              <h5>{perfilData.data.telefono}</h5>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h4>Descripción</h4>
              <h5>{perfilData.data.descripcion}</h5>
              <h4>Dirección</h4>
              <h5>{perfilData.data.direccion}</h5>
            </Col>
            <Col md={6}>
              <h4>Cédula Profesional</h4>
              <h5>{perfilData.data.cedula_profesional}</h5>
            </Col>
          </Row>
        </>
      ) : rol === 3 ? (
        <h1>Perfil de Paciente</h1>
      ) : (
        <h1>Cargando datos de perfil...</h1>
      )}
    </Container>
  );
}
