"use client";
import { ConsultaController } from "@/controllers/nutriologo/consultaController";
import { ConsultaFormulario } from "@/interfaces/nutriologo/consultaFormulario";
import { PacienteData } from "@/interfaces/nutriologo/pacienteData";
import { Params } from "@/interfaces/params";
import { Utils } from "@/utils/utils";
import Link from "next/link";
import { use, useEffect, useState } from "react";

const initialDatosFormulario: ConsultaFormulario = {
  nutriologo_id: null,
  paciente_id: null,
  peso: null,
  estatura: null,
  circunferencia_cintura: null,
  circunferencia_cadera: null,
  circunferencia_brazo: null,
  pliegue_bicipital: null,
  pliegue_tricipital: null,
  glucosa: null,
  colesterol: null,
  trigliceridos: null,
  presion_arterial: null,
  fecha_medicion: null,
  siguiente_consulta: null,
};

export default function ConsultaPage({ params }: Params) {
  const { id } = use(params);
  const [paciente, setPaciente] = useState<PacienteData>();
  const [consulta, setConsulta] = useState<any[]>([]);
  const [datosFormulario, setDatosFormulario] = useState<ConsultaFormulario>(initialDatosFormulario);

  const fetchPaciente = async () => {
    let response = null;
    try {
      response = await ConsultaController.getPacienteId(Number(id));
      setPaciente(response?.data);
    } catch {
      setPaciente(response?.data);
    }
  };

  const fetchConsultas = async () => {
    try {
      const response = await ConsultaController.getAllConsultas(Number(id));
      const consultas = response?.data;

      if (!consultas || consultas.length === 0) {
        setConsulta([]);
        Utils.swalWarning("No hay datos de consultas previos.");
      } else {
        setConsulta(consultas);
      }
    } catch {
      Utils.swalError("Error al encontrar la consulta.");
      setConsulta([]);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPaciente();
      fetchConsultas();
    }
  }, [id]);

  const calcularEdad = (fechaNacimiento: string) => {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    if (
      hoy.getMonth() < fechaNac.getMonth() ||
      (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())
    ) {
      edad--;
    }
    return edad;
  };

  const handleGuardarDatos = async () => {
    const updatedDatosFormulario: ConsultaFormulario = {
      ...datosFormulario,
      nutriologo_id: Number(sessionStorage.getItem("id_nutriologo")),
      paciente_id: Number(id),
    };

    try {
      await ConsultaController.addConsulta(updatedDatosFormulario);
      setDatosFormulario(initialDatosFormulario);
      fetchConsultas();
    } catch {
      Utils.swalError("Error al guardar los datos de consulta");
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
                  <Link href={`https://wa.me/${paciente.telefono}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-green-600 hover:text-green-800">
                    <span className="flex items-center gap-1">
                      {paciente.telefono} 
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </span>
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
                value={datosFormulario.peso ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    peso: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.estatura ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    estatura: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.circunferencia_cintura ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    circunferencia_cintura: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.circunferencia_cadera ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    circunferencia_cadera: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.circunferencia_brazo ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    circunferencia_brazo: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.pliegue_bicipital ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    pliegue_bicipital: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.pliegue_tricipital ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    pliegue_tricipital: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.glucosa ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    glucosa: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.colesterol ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    colesterol: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.trigliceridos ?? ""}
                onChange={(e) =>
                  setDatosFormulario({
                    ...datosFormulario,
                    trigliceridos: e.target.value === "" ? null : Number(e.target.value),
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
                value={datosFormulario.presion_arterial ?? ""}
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
                value={datosFormulario.fecha_medicion ?? ""}
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
                value={datosFormulario.siguiente_consulta ?? ""}
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