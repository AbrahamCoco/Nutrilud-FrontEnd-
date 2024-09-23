"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Dropdown, Modal } from "react-bootstrap";
import { Utils } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
import MenuAdmin from "./users/administrador/MenuAdmin";
import MenuNutri from "./users/nutriologo/MenuNutri";
import MenuPaciente from "./users/paciente/MenuPaciente";
import { NavbarController } from "./navbarController";
// import LogoNutrilud from "../../../public/images/LogoNutrilud.jpg";

export default function Navbar() {
  const [rol, setRol] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedRol = sessionStorage.getItem("trol_id");
    if (storedRol) {
      setRol(Number(storedRol));
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await NavbarController.login(usuario, contrasenia);

      if (response.data.trol_id === 1) {
        router.push("/administrador");
      } else if (response.data.trol_id === 2) {
        router.push("/nutriologo");
      } else if (response.data.trol_id === 3) {
        router.push("/paciente");
      } else {
        Utils.swalError("Error al iniciar sesión", "Favor de iniciar sesión nuevamente");
        router.push("/");
      }

      setRol(response.data.trol_id);
      closeModal();
    } catch (error) {
      setRol(null);
    }
  };

  const handleLogout = async () => {
    await NavbarController.logout();
    setRol(null);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-success bg-success bg-gradient">
        <div className="container-fluid">
          <div className="row lg-6">
            <ul className="nav">
              {/* <img src={LogoNutrilud} alt="Logo Nutrilud" className="fluid rounded-circle ms-4" width={42} /> */}
              <li className="nav-item">
                <Link href="/" className="nav-link text-white">
                  Nutrilud
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contacto" className="nav-link text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div className="row lg-6">
            <ul className="nav">
              {rol ? (
                <>
                  <li className="nav-item">
                    <Link href="/perfil" className="nav-link text-white">
                      Perfil
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Opciones
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {rol === 1 ? <MenuAdmin /> : rol === 2 ? <MenuNutri /> : rol === 3 ? <MenuPaciente /> : null}
                        <Dropdown.Item as={Link} href="/" onClick={handleLogout}>
                          Cerrar Sesión
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-2">
                    <Link href="/registro" className="text-white text-decoration-none">
                      <button className="btn btn-primary">Registrarse</button>
                    </Link>
                  </li>
                  <li className="nav-item ms-2">
                    <button className="btn btn-primary" onClick={openModal}>
                      Iniciar Sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" name="usuario" id="usuario" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          <label htmlFor="contrasenia">Contraseña</label>
          <input type="password" name="contrasenia" id="contrasenia" className="form-control" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cerrar
          </button>
          <button className="btn btn-primary" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
