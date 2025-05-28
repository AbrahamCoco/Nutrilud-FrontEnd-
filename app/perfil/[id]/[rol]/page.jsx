import PerfilAdmin from "@/app/components/users/administrador/PerfilAdmin";
import PerfilNutriologo from "@/app/components/users/nutriologo/PerfilNutriologo";
import PerfilPaciente from "@/app/components/users/paciente/PerfilPaciente";
import "boxicons/css/boxicons.min.css";

export default async function Perfil({ params }) {
  let { id } = await params;
  let { rol } = await params;

  id = parseInt(id, 10);
  rol = parseInt(rol, 10);

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
