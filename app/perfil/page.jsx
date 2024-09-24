"use client";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "boxicons/css/boxicons.min.css";
import { PerfilController } from "./perfilController";
import PerfilAdmin from "../components/users/administrador/PerfilAdmin";
import PerfilNutriologo from "../components/users/nutriologo/PerfilNutriologo";
import PerfilPaciente from "../components/users/paciente/PerfilPaciente";

export default function Perfil() {
  const [rol, setRol] = useState(null);
  const [edad, setEdad] = useState(0);
  const [perfilData, setPerfilData] = useState(null);

  const handleDatosPerfil = async () => {
    try {
      const response = await PerfilController.getUser(sessionStorage.getItem("id_user"));
      setPerfilData(response.data);
    } catch (error) {
      setPerfilData(null);
    }
  };

  useEffect(() => {
    const storedRol = parseInt(sessionStorage.getItem("trol_id"), 10);
    if (storedRol) {
      setRol(storedRol);
      handleDatosPerfil();
    }

    if (perfilData?.paciente?.fecha_nacimiento) {
      setEdad(PerfilController.calcularEdad(perfilData.paciente.fecha_nacimiento));
    }
  }, [perfilData?.paciente?.fecha_nacimiento]);

  return (
    <Container>
      {rol === 1 && perfilData ? (
        <PerfilAdmin perfilData={perfilData} />
      ) : rol === 2 && perfilData ? (
        <PerfilNutriologo perfilData={perfilData} />
      ) : rol === 3 && perfilData ? (
        <PerfilPaciente perfilData={perfilData} />
      ) : (
        <h1>Cargando datos de perfil...</h1>
      )}
    </Container>
  );
}
