import { AgregarArticuloController } from "@/controllers/nutriologo/agregarArticuloController";
import { PacientesController } from "@/controllers/nutriologo/pacientesController";
import { getAuthPayload } from "@/utils/auth";
import { useState } from "react";

export default function NuevoPaciente({ data }: { data: any }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>("");
  const [primer_apellido, setPrimer_apellido] = useState<string>("");
  const [segundo_apellido, setSegundo_apellido] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contrasenia, setContrasenia] = useState<string>("");
  const [alergias, setAlergias] = useState<string>("");
  const [id_paciente, setId_paciente] = useState<string>("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const uploadImage = async () => {
    const payload = getAuthPayload();

    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("nombre", nombre);
    formData.append("apellido", primer_apellido);
    formData.append("id", payload?.id_nutriologo ?? "");

    try {
      const response = await AgregarArticuloController.uploadImage(formData);
      return response?.data;
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
        alergias,
        id_paciente,
        fecha_nacimiento_paciente: formated,
        telefono_paciente: telefono,
        sexo_paciente: sexo,
      };

      const response = await PacientesController.addPaciente(userData);

      data();
      closeModal();
      return response;
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        Nuevo Paciente
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>

          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full relative">
              <div className="bg-green-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">
                  Agregar nuevo paciente
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Foto del paciente
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedFile(e.target.files[0]);
                          } else {
                            setSelectedFile(null);
                          }
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label
                        htmlFor="primer_apellido"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label
                        htmlFor="segundo_apellido"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label
                        htmlFor="usuario"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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

                    <div>
                      <label
                        htmlFor="usuario"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Alergias
                      </label>
                      <input
                        type="text"
                        id="alergias"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={alergias}
                        onChange={(e) => setAlergias(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="correo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label
                        htmlFor="contrasenia"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label
                        htmlFor="fecha_nacimiento"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sexo
                      </label>
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
    </>
  );
}
