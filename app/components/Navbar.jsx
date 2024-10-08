"use client";
import { useState } from "react";
import Link from "next/link";
import { Dropdown, Modal } from "react-bootstrap";
import axiosInstance from "../utils/axiosConfig";
import { Utils } from "@/app/utils/utils";
import { useRouter } from "next/navigation";
// import LogoNutrilud from "../../../public/images/LogoNutrilud.jpg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rol, setRol] = useState(null);
  const router = useRouter();

  const handleLogin = () => {
    const usuario = document.getElementById("usuario").value;
    const contrasenia = document.getElementById("contrasenia").value;

    axiosInstance
      .post("/auth/login", {
        usuario: usuario,
        contrasenia: contrasenia,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("id_user", response.data.user);
        sessionStorage.setItem("admin_id", response.data.admin_id ?? null);
        sessionStorage.setItem("nutriologo_id", response.data.nutriologo_id ?? null);
        sessionStorage.setItem("paciente_id", response.data.paciente_id ?? null);
        sessionStorage.setItem("trol_id", response.data.trol_id);
        setRol(response.data.trol_id);
        closeModal();
        setIsLoggedIn(true);
        if (response.data.trol_id == 1) {
          router.push("/administrador");
        } else if (response.data.trol_id == 2) {
          router.push("/nutriologo");
        } else if (response.data.trol_id == 3) {
          router.push("/paciente");
        }
      })
      .then(() => {
        Utils.swalSuccess("Inicio de sesión correcto");
      })
      .catch((error) => {
        Utils.swalFailure("Error al iniciar sesión", error.message);
      });
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nutriologo_id");
      sessionStorage.removeItem("admin_id");
      sessionStorage.removeItem("paciente_id");
      setIsLoggedIn(false);
      Utils.swalSuccess("Cerró sesión correctamente");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Utils.swalError("El token es inválido. Necesita iniciar sesión nuevamente");
      } else {
        Utils.swalError("Error al cerrar sesión", error.message);
      }
    }
  };

  const [showModal, setShowModal] = useState(false);

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
              {isLoggedIn ? (
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
                        {rol === 1 ? (
                          <>
                            <Dropdown.Item as={Link} href="/administrador">
                              Dashboard
                            </Dropdown.Item>
                            <Dropdown.Divider />
                          </>
                        ) : rol === 2 ? (
                          <>
                            <Dropdown.Item as={Link} href="/nutriologo">
                              Dashboard
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} href="/nutriologo/agregar-articulo">
                              Agregar articulo
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} href="/nutriologo/agenda">
                              Agenda
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} href="/nutriologo/pacientes">
                              Pacientes
                            </Dropdown.Item>
                          </>
                        ) : rol === 3 ? (
                          <>
                            <Dropdown.Item as={Link} href="/paciente">
                              Dashboard
                            </Dropdown.Item>
                            <Dropdown.Divider />
                          </>
                        ) : null}
                        <Dropdown.Divider />
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
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="usuario">Usuario</label>
          <input type="text" name="usuario" id="usuario" className="form-control" />
          <label htmlFor="contrasenia">Contraseña</label>
          <input type="password" name="contrasenia" id="contrasenia" className="form-control" />
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
