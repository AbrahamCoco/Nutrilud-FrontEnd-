"use client";
import { RecordatorioController } from "@/controllers/nutriologo/recordatorioController";
import { Utils } from "@/utils/utils";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function HistoryRecordatorioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [recordatorios, setRecordatorios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecordatorio, setSelectedRecordatorio] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecordatorios = async () => {
      try {
        setLoading(true);
        const response = await RecordatorioController.getRecordatoriosByPacienteId(Number(id));
        
        if (response?.success !== true) {
          Utils.swalError(response?.message || "Error al obtener los recordatorios");
          setRecordatorios([]);
        } else {
          setRecordatorios(response.data || []);
        }
      } catch (error) {
        Utils.swalError("Error al obtener los recordatorios");
        setRecordatorios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordatorios();
  }, [id]);

  const filteredRecordatorios = recordatorios.filter(recordatorio => 
    recordatorio.id.toString().includes(searchTerm) ||
    new Date(recordatorio.created_at).toLocaleDateString().includes(searchTerm)
  );

  const handleViewRecordatorio = (recordatorio: any) => {
    setSelectedRecordatorio(recordatorio);
  };

  const downloadPDF = () => {
    if (!selectedRecordatorio) return;
    Utils.downloadPDF(selectedRecordatorio);
  };

  const DetailPanel = () => {
    if (!selectedRecordatorio) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full flex flex-col transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              Detalles del Recordatorio
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                ID:
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" 
                  />
                </svg>
                {selectedRecordatorio.id}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
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
                {new Date(selectedRecordatorio.created_at).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedRecordatorio(null)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Cerrar panel"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
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

        {/* Contenido principal */}
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Tabla de plan de alimentación */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              Plan de alimentación
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Comida', 'Hora', 'Alimentos', 'Porciones', 'Marca', 'Preparación'].map((header, idx) => (
                      <th 
                        key={idx}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedRecordatorio.tdata_recordatorio.map((comida: any, index: number) => (
                    <tr 
                      key={index} 
                      className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {comida.comida || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {comida.hora ? `${comida.hora} hrs` : <span className="text-gray-400">No especificada</span>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                        {comida.alimentos || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {comida.porciones || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {comida.marca || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {comida.preparacion || <span className="text-gray-400">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Secciones complementarias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-5 rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 text-green-600" 
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
                <h3 className="text-sm font-semibold text-green-800">Otros alimentos complementarios</h3>
              </div>
              <p className="text-sm text-green-700 whitespace-pre-line bg-white p-3 rounded border border-green-200">
                {selectedRecordatorio.otros || <span className="text-gray-400 italic">No hay alimentos complementarios especificados</span>}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2 text-blue-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" 
                  />
                </svg>
                <h3 className="text-sm font-semibold text-blue-800">Observaciones hacia el paciente</h3>
              </div>
              <p className="text-sm text-blue-700 whitespace-pre-line bg-white p-3 rounded border border-blue-200">
                {selectedRecordatorio.observaciones || <span className="text-gray-400 italic">No hay observaciones registradas</span>}
              </p>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="flex justify-end mt-4">
            <button
              onClick={() => downloadPDF()}
              className="inline-flex items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-all duration-150 ease-in-out group transform hover:-translate-y-0.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 group-hover:animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Exportar a PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            Historial de Recordatorios
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Listado completo de recordatorios generados para el paciente
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar recordatorios..."
              className="block w-full py-2 pl-10 pr-4 text-sm transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar recordatorios"
            />
          </div>

          <Link href={`/nutriologo/pacientes/consulta/${id}/new_recordatorios`} >
            <button
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 transform bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:bg-green-800 hover:scale-[1.02] active:scale-100"
              aria-label="Crear nuevo recordatorio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nuevo Recordatorio
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Panel izquierdo (1/3 de pantalla) */}
        <div className="w-full lg:w-1/3">
          {loading ? (
            <div className="flex justify-center items-center py-12 bg-white rounded-xl shadow-md border border-gray-200">
              <svg className="animate-spin h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : filteredRecordatorios.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mt-3">No se encontraron recordatorios</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm ? "Intenta con otro término de búsqueda" : "No hay recordatorios registrados para este paciente"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden h-full">
              <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecordatorios.slice().reverse().map((recordatorio, index) => (
                      <tr 
                        key={recordatorio.id} 
                        className={`hover:bg-gray-50 transition-colors ${selectedRecordatorio?.id === recordatorio.id ? 'bg-green-50' : ''}`}
                      >
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(recordatorio.created_at).toLocaleDateString('es-MX', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewRecordatorio(recordatorio)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Panel derecho (2/3 de pantalla) - Dinámico */}
        <div className="w-full lg:w-2/3">
          {selectedRecordatorio ? (
            <DetailPanel />
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 flex flex-col items-center justify-center h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-500 mb-1">Selecciona un recordatorio</h3>
              <p className="text-gray-400 text-sm">Haz clic en "Ver detalles" para mostrar la información completa</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}