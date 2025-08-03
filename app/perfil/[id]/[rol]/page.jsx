"use client";
import PerfilAdmin from "@/app/components/users/administrador/PerfilAdmin";
import PerfilNutriologo from "@/app/components/users/nutriologo/PerfilNutriologo";
import PerfilPaciente from "@/app/components/users/paciente/PerfilPaciente";
import "boxicons/css/boxicons.min.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Perfil() {
  const params = useParams();
  const [rol,setRol] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    setRol(parseInt(params.rol, 10));
    setId(parseInt(params.id, 10));
  }, [params]);

  const renderPerfil = () => {
    switch (rol) {
      case 1:
        return <PerfilAdmin id={id} />;
      case 2:
        return <PerfilNutriologo id={id} />;
      case 3:
        return <PerfilPaciente id={id} />;
      default:
        return <h1>Cargando datos de perfil...</h1>;
    }
  };

  return renderPerfil();
}
