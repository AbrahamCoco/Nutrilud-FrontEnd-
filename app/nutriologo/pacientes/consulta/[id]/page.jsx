"use client";
import { Utils } from "@/app/utils/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { ConsultaController } from "./consultaController";

export default function Consulta() {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [consulta, setConsulta] = useState(null);
  const [datosFormulario, setDatosFormulario] = useState({
    nutriologo_id: "",
    paciente_id: "",
    peso: "",
    estatura: "",
    circunferencia_cintura: "",
    circunferencia_cadera: "",
    circunferencia_brazo: "",
    pliegue_bicipital: "",
    pliegue_tricipital: "",
    glucosa: "",
    colesterol: "",
    trigliceridos: "",
    presion_arterial: "",
    fecha_medicion: "",
    siguiente_consulta: "",
  });

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await ConsultaController.getPacienteId(id);
        setPaciente(response.data);
      } catch {
        setPaciente(null);
      }
    };

    const fetchConsultas = async () => {
      try {
        const response = await ConsultaController.getAllConsultas(id);
        const consultas = await response.data;

        if (!consultas || consultas.length === 0) {
          setConsulta(null);
          Utils.swalWarning("No hay datos de consulta previos");
        } else {
          setConsulta(consultas);
          Utils.swalSuccess("Datos de consulta cargados correctamente");
        }
      } catch (error) {
        const message = error.response?.data?.message || "No se encontraron datos de consulta.";
        Utils.swalWarning(message);
        setConsulta(null);
      }
    };

    fetchPaciente();
    fetchConsultas();
  }, [id]);

  const calcularEdad = (fechaNacimiento) => {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    if (hoy.getMonth() < fechaNac.getMonth() || (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleGuardarDatos = async () => {
    const updatedDatosFormulario = {
      ...datosFormulario,
      nutriologo_id: sessionStorage.getItem("id_nutriologo"),
      paciente_id: id,
    };

    try {
      await ConsultaController.addConsulta(updatedDatosFormulario);
      setDatosFormulario({
        peso: "",
        estatura: "",
        circunferencia_cintura: "",
        circunferencia_cadera: "",
        circunferencia_brazo: "",
        pliegue_bicipital: "",
        pliegue_tricipital: "",
        glucosa: "",
        colesterol: "",
        trigliceridos: "",
        presion_arterial: "",
        fecha_medicion: "",
        siguiente_consulta: "",
      });
      loadDatosConsulta();
    } catch (error) {
      Utils.swalFailure("Error al guardar los datos de consulta", error.message);
    }
  };

  if (!paciente) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold text-gray-700">Cargando paciente...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Consulta</h1>

      {/* Sección de datos del paciente */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-2">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Datos del paciente</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Alergias</th>
                <th className="py-3 px-4 text-left">Sexo</th>
                <th className="py-3 px-4 text-left">Edad</th>
                <th className="py-3 px-4 text-left">Correo</th>
                <th className="py-3 px-4 text-left">Teléfono</th>
                <th className="py-3 px-4 text-left">Recordatorios</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <strong>
                    {paciente.nombrePaciente}
                  </strong>
                </td>
                <td className="py-3 px-4">{paciente.alergias}</td>
                <td className="py-3 px-4">{paciente.sexo}</td>
                <td className="py-3 px-4">{calcularEdad(paciente.fechaNacimiento)} años</td>
                <td className="py-3 px-4">{paciente.correo}</td>
                <td className="py-3 px-4 flex items-center">
                  {paciente.telefono}
                  <Link href={`https://wa.me/${paciente.telefono}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-green-600 hover:text-green-800">
                    <BsWhatsapp className="text-xl" />
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Link
                    href={{pathname: `/nutriologo/pacientes/consulta/${id}/new_recordatorios`}}
                    className="inline-flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    Nuevo
                  </Link>
                  <Link
                    href={{
                      pathname: `/nutriologo/pacientes/consulta/${id}/history_recordatorios`,
                    }}
                    className="ml-2 inline-flex items-center justify-center p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Historial
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de consultas previas */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-2">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Datos de consultas previas</h2>
        {consulta ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Fecha de medición
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Peso
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Estatura
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    IMC
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Glucosa
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Colesterol
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Triglicéridos
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Presión Arterial
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    % Grasa Corporal
                  </th>
                  <th className="py-3 px-4 text-center" rowSpan={2}>
                    Masa Muscular
                  </th>
                  <th className="py-3 px-4 text-center" colSpan={3}>
                    Circunferencia
                  </th>
                  <th className="py-3 px-4 text-center" colSpan={2}>
                    Pliegue
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 text-center">Cintura</th>
                  <th className="py-2 px-4 text-center">Cadera</th>
                  <th className="py-2 px-4 text-center">Brazo</th>
                  <th className="py-2 px-4 text-center">Bicipital</th>
                  <th className="py-2 px-4 text-center">Tricipital</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {Array.isArray(consulta) &&
                  consulta.slice(-3).map((datos) => (
                    <tr key={datos.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-center">
                        {new Date(new Date(datos.fecha_medicion.split(" ")[0]).getTime() + 86400000).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-center">{datos.peso.toFixed(3)} kg</td>
                      <td className="py-3 px-4 text-center">{datos.estatura.toFixed(2)} m</td>
                      <td className="py-3 px-4 text-center">{datos.imc.toFixed(3)} kg/m²</td>
                      <td className="py-3 px-4 text-center">{datos.glucosa.toFixed(2)} mg/dL</td>
                      <td className="py-3 px-4 text-center">{datos.colesterol.toFixed(2)} mg/dL</td>
                      <td className="py-3 px-4 text-center">{datos.trigliceridos.toFixed(2)} mg/dL</td>
                      <td className="py-3 px-4 text-center">{datos.presion_arterial}</td>
                      <td className="py-3 px-4 text-center">{datos.porcentaje_grasa.toFixed(2)} %</td>
                      <td className="py-3 px-4 text-center">{datos.porcentaje_musculo.toFixed(3)} kg</td>
                      <td className="py-3 px-4 text-center">{datos.circunferencia_cintura.toFixed(2)} cm</td>
                      <td className="py-3 px-4 text-center">{datos.circunferencia_cadera.toFixed(2)} cm</td>
                      <td className="py-3 px-4 text-center">{datos.circunferencia_brazo.toFixed(2)} cm²</td>
                      <td className="py-3 px-4 text-center">{datos.pliegue_bicipital.toFixed(2)} mm</td>
                      <td className="py-3 px-4 text-center">{datos.pliegue_tricipital.toFixed(2)} mm</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">No hay datos de consulta previos</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulario para nueva consulta */}
      <div className="bg-white rounded-lg shadow-md p-2">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Agregar datos de consulta actual</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Columna 1 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="peso" className="block text-sm font-medium text-gray-700 mb-1">
                Peso <span className="text-gray-500">(Kg)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="peso"
                value={datosFormulario.peso}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    peso: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="estatura" className="block text-sm font-medium text-gray-700 mb-1">
                Estatura <span className="text-gray-500">(m)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="estatura"
                value={datosFormulario.estatura}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    estatura: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="circunferencia_cintura" className="block text-sm font-medium text-gray-700 mb-1">
                Circunferencia de cintura <span className="text-gray-500">(cm)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="circunferencia_cintura"
                value={datosFormulario.circunferencia_cintura}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    circunferencia_cintura: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="circunferencia_cadera" className="block text-sm font-medium text-gray-700 mb-1">
                Circunferencia de cadera <span className="text-gray-500">(cm)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="circunferencia_cadera"
                value={datosFormulario.circunferencia_cadera}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    circunferencia_cadera: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="circunferencia_brazo" className="block text-sm font-medium text-gray-700 mb-1">
                Circunferencia de brazo <span className="text-gray-500">(cm²)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="circunferencia_brazo"
                value={datosFormulario.circunferencia_brazo}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    circunferencia_brazo: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Columna 3 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="pliegue_bicipital" className="block text-sm font-medium text-gray-700 mb-1">
                Pliegue bicipital <span className="text-gray-500">(mm)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="pliegue_bicipital"
                value={datosFormulario.pliegue_bicipital}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    pliegue_bicipital: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="pliegue_tricipital" className="block text-sm font-medium text-gray-700 mb-1">
                Pliegue tricipital <span className="text-gray-500">(mm)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="pliegue_tricipital"
                value={datosFormulario.pliegue_tricipital}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    pliegue_tricipital: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Columna 4 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="glucosa" className="block text-sm font-medium text-gray-700 mb-1">
                Glucosa <span className="text-gray-500">(mg/dL)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="glucosa"
                value={datosFormulario.glucosa}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    glucosa: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="colesterol" className="block text-sm font-medium text-gray-700 mb-1">
                Colesterol <span className="text-gray-500">(mg/dL)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="colesterol"
                value={datosFormulario.colesterol}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    colesterol: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="trigliceridos" className="block text-sm font-medium text-gray-700 mb-1">
                Triglicéridos <span className="text-gray-500">(mg/dL)</span>
              </label>
              <input
                type="number"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="trigliceridos"
                value={datosFormulario.trigliceridos}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    trigliceridos: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="presion_arterial" className="block text-sm font-medium text-gray-700 mb-1">
                Presión arterial
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="presion_arterial"
                value={datosFormulario.presion_arterial}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    presion_arterial: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Columna 5 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="fecha_medicion" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de medición
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="fecha_medicion"
                value={datosFormulario.fecha_medicion}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    fecha_medicion: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="fecha_siguiente_consulta" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de siguiente consulta
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                name="siguiente_consulta"
                value={datosFormulario.siguiente_consulta}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    siguiente_consulta: e.target.value,
                  })
                }
              />
            </div>
            <div className="pt-8 text-center">
              <button
                className="px-6 py-2 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                type="button"
                onClick={handleGuardarDatos}
              >
                Guardar datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
