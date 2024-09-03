"use client";
import { useState } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import axios from "axios";
import axiosInstance from "../utils/axiosConfig";
// import LogoNutrilud from "../../../public/images/LogoNutrilud.jpg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const usuario = document.getElementById("usuario").value;
    const contrasenia = document.getElementById("contrasenia").value;

    axiosInstance
      .post("auth/login", {
        usuario: usuario,
        contrasenia: contrasenia,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin_id", response.data.admin_id ?? null);
        localStorage.setItem(
          "nutriologo_id",
          response.data.nutriologo_id ?? null
        );
        localStorage.setItem("paciente_id", response.data.paciente_id ?? null);
        localStorage.setItem("trol_id", response.data.trol_id);
        closeModal();
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("nutriologo_id");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("paciente_id");
      setIsLoggedIn(false);
      console.log("Cerró sesión correctamente");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // El token es inválido
        console.log("El token es inválido. Necesita iniciar sesión nuevamente");
      } else {
        // Otro error
        console.log("Error no cerró sesión", error);
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
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-primary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Opciones
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link
                            href="/nutriologo/agregar-articulo"
                            className="dropdown-item"
                          >
                            Agregar articulo
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/nutriologo/agenda"
                            className="dropdown-item"
                          >
                            Agenda
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/nutriologo/pacientes"
                            className="dropdown-item"
                          >
                            Pacientes
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={handleLogout}
                          >
                            Cerrar Sesión
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-2">
                    <Link
                      href="/registro"
                      className="text-white text-decoration-none"
                    >
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
          <input
            type="text"
            name="usuario"
            id="usuario"
            className="form-control"
          />
          <label htmlFor="contrasenia">Contraseña</label>
          <input
            type="password"
            name="contrasenia"
            id="contrasenia"
            className="form-control"
          />
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
