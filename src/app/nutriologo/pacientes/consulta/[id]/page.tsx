"use client";
import SelectorCitaModal from "@/components/users/nutriologo/SelectorCita";
import { AgendaController } from "@/controllers/nutriologo/agendaController";
import { ConsultaController } from "@/controllers/nutriologo/consultaController";
import { ConsultaFormulario } from "@/interfaces/nutriologo/consultaFormulario";
import { PacienteData } from "@/interfaces/nutriologo/pacienteData";
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

export default function ConsultaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [paciente, setPaciente] = useState<PacienteData>();
  const [consulta, setConsulta] = useState<any[]>([]);
  const [eventos, setEventos] = useState<any[]>([]);
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

  const fetchEventos = async () => {
    try {
      const response = await AgendaController.getAgenda(parseInt(sessionStorage.getItem("id_nutriologo") || "0"));
      setEventos(response || []);
    } catch (error) {
      setEventos([]);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPaciente();
      fetchConsultas();
      fetchEventos();
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
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
            Datos del Paciente
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600">
              <tr>
                {['Nombre', 'Alergias', 'Sexo', 'Edad', 'Correo', 'Teléfono', 'Recordatorios'].map((header, idx) => (
                  <th 
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {header}
                      {idx === 6 && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                {/* Nombre */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-green-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {paciente.nombrePaciente}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Alergias */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {paciente.alergias || (
                      <span className="text-gray-400 italic">No registradas</span>
                    )}
                  </div>
                </td>

                {/* Sexo */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${paciente.sexo === 'Masculino' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}
                  >
                    {paciente.sexo}
                  </span>
                </td>

                {/* Edad */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <span className="text-sm text-gray-900">
                      {calcularEdad(paciente.fechaNacimiento)} años
                    </span>
                  </div>
                </td>

                {/* Correo */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                    {paciente.correo || (
                      <span className="text-gray-400 italic">No registrado</span>
                    )}
                  </div>
                </td>

                {/* Teléfono */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`https://wa.me/${paciente.telefono}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
                  >
                    <svg 
                      className="w-4 h-4 mr-2" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {paciente.telefono || (
                      <span className="text-gray-400 italic">No registrado</span>
                    )}
                  </Link>
                </td>

                {/* Recordatorios */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Link
                      href={{pathname: `/nutriologo/pacientes/consulta/${id}/new_recordatorios`}}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-150"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                        />
                      </svg>
                      Nuevo
                    </Link>
                    <Link
                      href={{pathname: `/nutriologo/pacientes/consulta/${id}/history_recordatorios`}}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-150"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 mr-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                        />
                      </svg>
                      Historial
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de consultas previas */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-md">
        <div className="p-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
            Historial de Consultas
          </h2>
          <p className="text-sm text-gray-500 mt-1">Últimas 3 mediciones registradas</p>
        </div>

        {consulta.length != 0 && consulta ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Fecha
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Peso (kg)
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Estatura (m)
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    IMC
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Glucosa
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Colesterol
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Triglicéridos
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Presión
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    % Grasa
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" rowSpan={2}>
                    Masa Muscular
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" colSpan={3}>
                    Circunferencia (cm)
                  </th>
                  <th className="py-3 px-4 text-center font-medium uppercase text-sm tracking-wider" colSpan={2}>
                    Pliegues (mm)
                  </th>
                </tr>
                <tr>
                  <th className="py-2 px-4 text-center text-xs font-medium uppercase tracking-wider">Cintura</th>
                  <th className="py-2 px-4 text-center text-xs font-medium uppercase tracking-wider">Cadera</th>
                  <th className="py-2 px-4 text-center text-xs font-medium uppercase tracking-wider">Brazo</th>
                  <th className="py-2 px-4 text-center text-xs font-medium uppercase tracking-wider">Bicipital</th>
                  <th className="py-2 px-4 text-center text-xs font-medium uppercase tracking-wider">Tricipital</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(consulta) &&
                  consulta.slice(-3).map((datos) => (
                    <tr key={datos.id} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="py-4 px-4 text-center text-sm text-gray-900 whitespace-nowrap">
                        <div className="flex flex-col items-center">
                          <span className="font-medium">
                            {new Date(new Date(datos.fecha_medicion.split(" ")[0]).getTime() + 86400000).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(new Date(datos.fecha_medicion.split(" ")[0]).getTime() + 86400000).toLocaleDateString("es-ES", {
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        <span className="font-medium">{datos.peso.toFixed(2)} kg</span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.estatura.toFixed(2)} m
                      </td>
                      <td className="py-4 px-4 text-center text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          datos.imc < 18.5 ? 'bg-blue-100 text-blue-800' :
                          datos.imc >= 18.5 && datos.imc < 25 ? 'bg-green-100 text-green-800' :
                          datos.imc >= 25 && datos.imc < 30 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {datos.imc.toFixed(1)} kg/m²
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        <span className={`${datos.glucosa > 99 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {datos.glucosa.toFixed(0)} mg/dL
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        <span className={`${datos.colesterol > 199 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {datos.colesterol.toFixed(0)} mg/dL
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        <span className={`${datos.trigliceridos > 149 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {datos.trigliceridos.toFixed(0)} mg/dL
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.presion_arterial} mmHg
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.porcentaje_grasa.toFixed(1)} %
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.porcentaje_musculo.toFixed(1)} kg
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.circunferencia_cintura.toFixed(1)} cm
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.circunferencia_cadera.toFixed(1)} cm
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.circunferencia_brazo.toFixed(1)} cm²
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.pliegue_bicipital.toFixed(1)} mm
                      </td>
                      <td className="py-4 px-4 text-center text-sm text-gray-900">
                        {datos.pliegue_tricipital.toFixed(1)} mm
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div className="flex items-start">
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
                  <h3 className="text-sm font-medium text-yellow-800">No hay datos de consultas previas</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Este paciente no tiene registros de mediciones anteriores.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulario para nueva consulta */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mr-2 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
            Registrar Nueva Consulta
          </h2>
          <p className="text-sm text-gray-500 mt-1">Complete los datos antropométricos y bioquímicos del paciente</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Columna 1 - Datos básicos */}
            <div className="space-y-5">
              <div>
                <label htmlFor="peso" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Peso (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    name="peso"
                    value={datosFormulario.peso ?? ""}
                    onChange={(e) => setDatosFormulario({...datosFormulario, peso: e.target.value === "" ? null : Number(e.target.value)})}
                  />
                  <span className="absolute left-3 top-2 text-gray-400">kg</span>
                </div>
              </div>

              <div>
                <label htmlFor="estatura" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Estatura (m)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    name="estatura"
                    value={datosFormulario.estatura ?? ""}
                    onChange={(e) => setDatosFormulario({...datosFormulario, estatura: e.target.value === "" ? null : Number(e.target.value)})}
                  />
                  <span className="absolute left-3 top-2 text-gray-400">m</span>
                </div>
              </div>
            </div>

            {/* Columna 2 - Circunferencias */}
            <div className="space-y-5">
              <div>
                <label htmlFor="circunferencia_cintura" className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Circunferencia de cintura (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  name="circunferencia_cintura"
                  value={datosFormulario.circunferencia_cintura ?? ""}
                  onChange={(e) => setDatosFormulario({...datosFormulario, circunferencia_cintura: e.target.value === "" ? null : Number(e.target.value)})}
                />
              </div>

              <div>
                <label htmlFor="circunferencia_cadera" className="block text-sm font-medium text-gray-700 mb-1">
                  Circunferencia de Cadera (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  name="circunferencia_cadera"
                  value={datosFormulario.circunferencia_cadera ?? ""}
                  onChange={(e) => setDatosFormulario({...datosFormulario, circunferencia_cadera: e.target.value === "" ? null : Number(e.target.value)})}
                />
              </div>

              <div>
                <label htmlFor="circunferencia_brazo" className="block text-sm font-medium text-gray-700 mb-1">
                  Circunferencia de Brazo (cm²)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  name="circunferencia_brazo"
                  value={datosFormulario.circunferencia_brazo ?? ""}
                  onChange={(e) => setDatosFormulario({...datosFormulario, circunferencia_brazo: e.target.value === "" ? null : Number(e.target.value)})}
                />
              </div>
            </div>

            {/* Columna 3 - Pliegues */}
            <div className="space-y-5">
              <div>
                <label htmlFor="pliegue_bicipital" className="block text-sm font-medium text-gray-700 mb-1">
                  Pliegue Bicipital (mm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  name="pliegue_bicipital"
                  value={datosFormulario.pliegue_bicipital ?? ""}
                  onChange={(e) => setDatosFormulario({...datosFormulario, pliegue_bicipital: e.target.value === "" ? null : Number(e.target.value)})}
                />
              </div>

              <div>
                <label htmlFor="pliegue_tricipital" className="block text-sm font-medium text-gray-700 mb-1">
                  Pliegue Tricipital (mm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  name="pliegue_tricipital"
                  value={datosFormulario.pliegue_tricipital ?? ""}
                  onChange={(e) => setDatosFormulario({...datosFormulario, pliegue_tricipital: e.target.value === "" ? null : Number(e.target.value)})}
                />
              </div>
              <div>
                <label htmlFor="presion_arterial" className="block text-sm font-medium text-gray-700 mb-1">
                  Presión Arterial
                </label>
                <input
                  type="text"
                  placeholder="Ej: 120/80"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  name="presion_arterial"
                  value={datosFormulario.presion_arterial ?? ""}
                  onChange={(e) => setDatosFormulario({...datosFormulario, presion_arterial: e.target.value})}
                />
              </div>
            </div>

          {/* Columna 4 */}
          <div className="space-y-4">
            <div>
              <label htmlFor="glucosa" className="block text-sm font-medium text-gray-700 mb-1">
                Glucosa <span className="text-gray-500">(mg/dL)</span>
              </label>
              <div className="relative">
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
            </div>
            <div>
              <label htmlFor="colesterol" className="block text-sm font-medium text-gray-700 mb-1">
                Colesterol <span className="text-gray-500">(mg/dL)</span>
              </label>
              <div className="relative">
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
            </div>
            <div>
              <label htmlFor="trigliceridos" className="block text-sm font-medium text-gray-700 mb-1">
                Triglicéridos <span className="text-gray-500">(mg/dL)</span>
              </label>
              <div className="relative">
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
            </div>
          </div>

            {/* Columna 5 - Fechas y acción */}
            <div className="space-y-5">
              <div>
                <label htmlFor="fecha_medicion" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha de Medición
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    name="fecha_medicion"
                    value={datosFormulario.fecha_medicion ?? ""}
                    onChange={(e) => setDatosFormulario({...datosFormulario, fecha_medicion: e.target.value})}
                  />
                </div>
              </div>

              <SelectorCitaModal
                eventos={eventos}
                onSelect={(fecha) =>
                  setDatosFormulario((prev) => ({ ...prev, siguiente_consulta: fecha }))
                }
              />

              <div className="pt-4">
                <button
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
                  type="button"
                  onClick={handleGuardarDatos}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                  Guardar Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}