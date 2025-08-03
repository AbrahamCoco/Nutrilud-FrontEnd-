"use client";
import Table from "@/app/components/Table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaEdit, FaFolderOpen, FaTrash, FaPlus, FaUserPlus } from "react-icons/fa";
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
      selector: (row) => `${row.nombrePaciente}`,
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row) => row.sexo,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: "Teléfono",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link href={`https://wa.me/${row.telefono}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors">
            <span className="flex items-center gap-1">
              {row.telefono} <BsWhatsapp className="text-lg" />
            </span>
          </Link>
        </div>
      ),
    },
    {
      name: "Estadísticas",
      cell: (row) => (
        <Link href={`/nutriologo/pacientes/estadisticas/${row.id_paciente}`} className="flex justify-center">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
            <ImStatsDots />
          </button>
        </Link>
      ),
    },
    {
      name: "Consulta",
      cell: (row) => (
        <Link href={`/nutriologo/pacientes/consulta/${row.id_paciente}`} className="flex justify-center">
          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
            <FaFolderOpen />
          </button>
        </Link>
      ),
    },
    {
      name: "Modificar",
      cell: (row) => (
        <div className="flex justify-center">
          <button onClick={() => console.log(row)} className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors">
            <FaEdit />
          </button>
        </div>
      ),
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <div className="flex justify-center">
          <button onClick={deleteAppClientCache(row.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h1>
        <button onClick={openModal} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <FaUserPlus /> Nuevo Paciente
        </button>
      </div>

      <Table columns={columns} data={pacientes} nameTable={"Pacientes"} />

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>

          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full relative">
              <div className="bg-green-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Agregar nuevo paciente</h3>
                <button onClick={closeModal} className="text-white hover:text-gray-200">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Foto del paciente
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </div>

                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="primer_apellido" className="block text-sm font-medium text-gray-700 mb-1">
                        Primer apellido
                      </label>
                      <input
                        type="text"
                        id="primer_apellido"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={primer_apellido}
                        onChange={(e) => setPrimer_apellido(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="segundo_apellido" className="block text-sm font-medium text-gray-700 mb-1">
                        Segundo apellido
                      </label>
                      <input
                        type="text"
                        id="segundo_apellido"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={segundo_apellido}
                        onChange={(e) => setSegundo_apellido(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario
                      </label>
                      <input
                        type="text"
                        id="usuario"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="correo"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="contrasenia" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="contrasenia"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        id="telefono"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        id="fecha_nacimiento"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={fecha_nacimiento}
                        onChange={(e) => setFecha_nacimiento(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                      <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="sexo"
                            value="Masculino"
                            checked={sexo === "Masculino"}
                            onChange={(e) => setSexo(e.target.value)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700">Masculino</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="sexo"
                            value="Femenino"
                            checked={sexo === "Femenino"}
                            onChange={(e) => setSexo(e.target.value)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <span className="ml-2 text-gray-700">Femenino</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleRegisterPaciente}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Guardar paciente
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
