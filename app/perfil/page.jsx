"use client";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "boxicons/css/boxicons.min.css";
import PerfilAdmin from "../components/users/administrador/PerfilAdmin";
import PerfilNutriologo from "../components/users/nutriologo/PerfilNutriologo";
import PerfilPaciente from "../components/users/paciente/PerfilPaciente";

export default function Perfil() {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const storedRol = parseInt(sessionStorage.getItem("trol_id"));
    if (storedRol) {
      setRol(storedRol);
    }
  }, []);

  return <Container>{rol === 1 ? <PerfilAdmin /> : rol === 2 ? <PerfilNutriologo /> : rol === 3 ? <PerfilPaciente /> : <h1>Cargando datos de perfil...</h1>}</Container>;
}
