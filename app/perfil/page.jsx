"use client";
import { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import axiosInstance from "@/app/utils/axiosConfig";
import { Utils } from "@/app/utils/utils";

export default function Perfil() {
  const [perfilData, setPerfilData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const nutriologoId = localStorage.getItem("nutriologo_id");
    const adminId = localStorage.getItem("admin_id");
    const pacienteId = localStorage.getItem("paciente_id");

    if (nutriologoId) {
      axiosInstance
        .get(`/auth/user/${nutriologoId}`)
        .then((response) => {
          setPerfilData(response.data.data);
          setIsLoading(false);
        })
        .then(() => {
          Utils.swalSuccess("Perfil cargado correctamente");
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else if (adminId) {
      axiosInstance
        .get(`/auth/user/${adminId}`)
        .then((response) => {
          setPerfilData(response.data.data);
          setIsLoading(false);
        })
        .then(() => {
          Utils.swalSuccess("Perfil cargado correctamente");
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else if (pacienteId) {
      axiosInstance
        .get(`/auth/user/${pacienteId}`)
        .then((response) => {
          setPerfilData(response.data.data);
          setIsLoading(false);
        })
        .then(() => {
          Utils.swalSuccess("Perfil cargado correctamente");
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      setError(new Error("El ID del nutriólogo no está definido en el almacenamiento local."));
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <Container>
      <h1>Perfil</h1>
      <Row>
        <Col md={3}>
          <Image src={perfilData.foto} alt={perfilData.user.nombre} fluid roundedCircle />
        </Col>
        <Col md={9}>
          <h4>Nombre</h4>
          <h5>
            {perfilData.user.nombre} {perfilData.user.primer_apellido} {perfilData.user.segundo_apellido}{" "}
          </h5>
          <h4>Correo</h4>
          <h5>{perfilData.user.correo}</h5>
          <h4>Telefono</h4>
          <h5>{perfilData.telefono}</h5>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>Descripcion</h4>
          <h5>{perfilData.descripcion}</h5>
          <h4>Direccion</h4>
          <h5>{perfilData.direccion}</h5>
        </Col>
        <Col md={6}>
          <h4>Cedula profesional</h4>
          <h5>{perfilData.cedula_profesional}</h5>
        </Col>
      </Row>
    </Container>
  );
}
