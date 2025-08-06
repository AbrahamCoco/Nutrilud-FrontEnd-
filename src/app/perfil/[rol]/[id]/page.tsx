"use client";
import PerfilAdmin from "@/components/users/administrador/PerfilAdmin";
import PerfilNutriologo from "@/components/users/nutriologo/PerfilNutriologo";
import PerfilPaciente from "@/components/users/paciente/PerfilPaciente";
import { useParams } from "next/navigation";

export default function PerfilPage() {
  const params = useParams();

  const rol = Number(params?.rol ?? 0);
  const id = Number(params?.id ?? 0);

  if (!rol || !id) return <h1>Cargando datos de perfil...</h1>;

  switch (rol) {
    case 1:
      return <PerfilAdmin id={id} />;
    case 2:
      return <PerfilNutriologo id={id} />;
    case 3:
      return <PerfilPaciente id={id} />;
    default:
      return <h1>Rol desconocido</h1>;
  }
}
