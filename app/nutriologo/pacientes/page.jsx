"use client";
import Table from "@/app/components/Table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import { FaEdit, FaFolderOpen, FaTrash } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { AgregarArticuloController } from "../agregar-articulo/agregarArticuloController";
import { PacientesController } from "./pacientesController";

export default function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [primer_apellido, setPrimer_apellido] = useState("");
  const [segundo_apellido, setSegundo_apellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [alergias, setAlergias] = useState("");
  const [id_paciente, setId_paciente] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPacientes();
  }, []);

  const deleteAppClientCache = (id) => async () => {
    try {
      const response = await PacientesController.deletePaciente(id);
      loadPacientes();
      return response;
    } catch (error) {
      return null;
    }
  };

  const loadPacientes = async () => {
    try {
      const response = await PacientesController.getAllPacientes();
      setPacientes(response.data);
    } catch (error) {
      setPacientes([]);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const uploadImage = async () => {
    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("nombre", nombre);
    formData.append("apellido", primer_apellido);
    formData.append("id", sessionStorage.getItem("id_nutriologo"));

    try {
      const response = await AgregarArticuloController.uploadImage(formData);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const handleRegisterPaciente = async () => {
    try {
      const imageUrl = await uploadImage();
      const formated = new Date(fecha_nacimiento).toISOString().split(".")[0];

      const userData = {
        nombre,
        primer_apellido,
        segundo_apellido,
        usuario,
        correo,
        contrasenia,
        rol_id: 3,
        foto_paciente: imageUrl,
        alergias_paciente: alergias,
        id_paciente,
        fecha_nacimiento_paciente: formated,
        telefono_paciente: telefono,
        sexo_paciente: sexo,
      };

      const response = await PacientesController.addPaciente(userData);

      loadPacientes();
      closeModal();
      return response;
    } catch (error) {
      return null;
    }
  };

  const columns = [
    {
      name: "No.",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => `${row.nombre} ${row.primer_apellido} ${row.segundo_apellido}`,
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row) => row.tusuario_pacientes.sexo,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: "Telefono",
      cell: (row) => (
        <>
          {row.tusuario_pacientes.telefono}{" "}
          <Link href={`https://wa.me/${row.tusuario_pacientes.telefono}`} target="_blank" rel="noopener noreferrer">
            <BsWhatsapp />
          </Link>
        </>
      ),
    },
    {
      name: "Estadisticas",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Link href={`/nutriologo/pacientes/estadisticas/${row.tusuario_pacientes.id}`}>
            <button className="btn btn-info pb-2">
              <ImStatsDots />
            </button>
          </Link>
        </div>
      ),
    },
    {
      name: "Consulta",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Link href={`/nutriologo/pacientes/consulta/${row.tusuario_pacientes.id}`}>
            <button className="btn btn-info pb-2">
              <FaFolderOpen />
            </button>
          </Link>
        </div>
      ),
    },
    {
      name: "Modificar",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Button variant="warning" onClick={() => console.log(row)}>
            <FaEdit />
          </Button>
        </div>
      ),
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={deleteAppClientCache(row.id)}>
            <FaTrash />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md={12}>
            <Table columns={columns} data={pacientes} nameTable={"Pacientes"} />
          </Col>
          <Col md={2}>
            <div>
              <button className="btn btn-primary mb-2" onClick={openModal}>
                Agregar paciente
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={closeModal} dialogClassName="modal-custom">
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <label htmlFor="image" className="form-label">
                Imagen
              </label>
              <input type="file" className="form-control" id="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
              <Col md={6}>
                <label htmlFor="" className="form-label">
                  Nombre
                </label>
                <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Primer apellido
                </label>
                <input type="text" className="form-control" id="primer_apellido" value={primer_apellido} onChange={(e) => setPrimer_apellido(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Segundo apellido
                </label>
                <input type="text" className="form-control" id="segundo_apellido" value={segundo_apellido} onChange={(e) => setSegundo_apellido(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Usuario
                </label>
                <input type="text" className="form-control" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Correo electronico
                </label>
                <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Alergias
                </label>
                <input type="text" className="form-control" id="alergias" value={alergias} onChange={(e) => setAlergias(e.target.value)} />
              </Col>
              <Col md={6}>
                <label htmlFor="" className="form-label">
                  Contraseña
                </label>
                <input type="password" className="form-control" id="contrasenia" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                <label htmlFor="" className="form-label">
                  ID paciente
                </label>
                <input type="text" className="form-control" id="id_paciente" value={id_paciente} onChange={(e) => setId_paciente(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Fecha de nacimiento
                </label>
                <input type="date" className="form-control" id="fecha_nacimiento" value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} />
                <label htmlFor="" className="form-label">
                  Telefono
                </label>
                <input type="text" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <label htmlFor="sexo" className="form-label">
                  Sexo
                </label>
                <div className="mb-2">
                  <div className="form-check-inline">
                    <label htmlFor="masculino" className="form-check-label">
                      <input type="radio" className="form-check-input" name="sexo" id="masculino" value="Masculino" checked={sexo === "Masculino"} onChange={(e) => setSexo(e.target.value)} />{" "}
                      Masculino
                    </label>
                  </div>
                  <div className="form-check-inline">
                    <label htmlFor="femenino" className="form-check-label">
                      <input type="radio" className="form-check-input" name="sexo" id="femenino" value="Femenino" checked={sexo === "Femenino"} onChange={(e) => setSexo(e.target.value)} /> Femenino
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleRegisterPaciente}>
            Guardar paciente
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
