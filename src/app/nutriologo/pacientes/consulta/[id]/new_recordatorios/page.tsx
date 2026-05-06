"use client";
import { RecordatorioController } from "@/controllers/nutriologo/recordatorioController";
import { ComidaData, DiaData } from "@/types/recordatoriosKey";
import { Utils } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";

export default function NewRecordatoriosPage({ params }: { params: Promise<{ id: string }> }) {
  const diasSemana: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const comidasDia: string[] = [
    "Desayuno", "Colación Mañana", "Almuerzo",
    "Colación Tarde", "Cena", "Colación Noche"
  ];

  const categorias: string[] = [
    "Alimentos", "Cantidad", "Hora", "Lugar",
    "Preparación"
  ];

  const router = useRouter();
  const { id } = use(params);

  const [semanaInicio, setSemanaInicio] = useState<string>("");
  const [semanaFin, setSemanaFin] = useState<string>("");

  // Inicializar matriz 3D: [día][comida][categoría]
  const initializeState = () => {
    return Array(diasSemana.length).fill("").map(() =>
      Array(comidasDia.length).fill("").map(() =>
        Array(categorias.length).fill("")
      )
    );
  };

  const [recordData, setRecordData] = useState<string[][][]>(initializeState());
  const [observaciones, setObservaciones] = useState<string>("");
  const [aguaPromedio, setAguaPromedio] = useState<string>("");

  // Calcular semana al cargar
  useEffect(() => {
    const hoy = new Date();
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - hoy.getDay() + 1); // Lunes de esta semana

    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6); // Domingo de esta semana

    setSemanaInicio(lunes.toISOString().split('T')[0]);
    setSemanaFin(domingo.toISOString().split('T')[0]);
  }, []);

  const handleInputChange = (
    diaIndex: number,
    comidaIndex: number,
    categoriaIndex: number,
    value: string
  ) => {
    setRecordData(prev => {
      const newData = [...prev];
      newData[diaIndex] = [...newData[diaIndex]];
      newData[diaIndex][comidaIndex] = [...newData[diaIndex][comidaIndex]];
      newData[diaIndex][comidaIndex][categoriaIndex] = value;
      return newData;
    });
  };

  const getDiaColor = (index: number) => {
    const colors = [
      "bg-blue-50 border-blue-200",      // Lunes
      "bg-green-50 border-green-200",    // Martes
      "bg-purple-50 border-purple-200",  // Miércoles
      "bg-amber-50 border-amber-200",    // Jueves
      "bg-red-50 border-red-200",        // Viernes
      "bg-indigo-50 border-indigo-200",  // Sábado
      "bg-cyan-50 border-cyan-200",      // Domingo
    ];
    return colors[index] || "bg-gray-50 border-gray-200";
  };

  const getComidaColor = (index: number) => {
    const colors = [
      "bg-orange-100 border-orange-200",    // Desayuno
      "bg-yellow-100 border-yellow-200",    // Colación Mañana
      "bg-emerald-100 border-emerald-200",  // Almuerzo
      "bg-lime-100 border-lime-200",        // Colación Tarde
      "bg-blue-100 border-blue-200",        // Cena
      "bg-indigo-100 border-indigo-200",    // Colación Noche
    ];
    return colors[index] || "bg-gray-100 border-gray-200";
  };

  const handleGuardarRecordatorio = async () => {
    if (!semanaInicio || !semanaFin) {
      Utils.swalWarning("Por favor, selecciona el rango de la semana");
      return;
    }

    const formattedData = diasSemana.map((dia, diaIndex) => {
      const diaData: DiaData = {
        dia: dia,
        comidas: []
      };

      comidasDia.forEach((comida, comidaIndex) => {
        const comidaData: ComidaData = { tipo_comida: comida };
        categorias.forEach((categoria, catIndex) => {
          if (recordData[diaIndex][comidaIndex][catIndex]) {
            const key = categoria.toLowerCase().replace(/ /g, '_').replace('á', 'a').replace('ó', 'o');
            comidaData[key] = recordData[diaIndex][comidaIndex][catIndex];
          }
        });
        diaData.comidas.push(comidaData);
      });

      return diaData;
    });

    const json = {
      nutriologo_id: Number(sessionStorage.getItem("id_nutriologo")),
      paciente_id: Number(id),
      semana_inicio: semanaInicio,
      semana_fin: semanaFin,
      agua_promedio: aguaPromedio,
      observaciones,
      tipo: "24_7_semanal",
      dias: formattedData
    };

    try {
      await RecordatorioController.addRecordatorio(json);
      setRecordData(initializeState());
      setAguaPromedio("");
      setObservaciones("");
      Utils.swalSuccess("Recordatorio de la semana guardado exitosamente");
      router.push(`/nutriologo/pacientes/consulta/${id}/history_recordatorios`);
    } catch {
      Utils.swalWarning("No se pudo guardar el recordatorio. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  const exportarPDF = () => {
    Utils.swalInfo("Función de exportar PDF en desarrollo");
    // Aquí iría la lógica para exportar a PDF
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Recordatorio Semanal 24/7
                  </h1>
                  <p className="text-gray-600">
                    Registro completo de consumo alimentario durante 7 días
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semana del
                    </label>
                    <input
                      type="date"
                      value={semanaInicio}
                      onChange={(e) => {
                        setSemanaInicio(e.target.value);
                        const inicio = new Date(e.target.value);
                        const fin = new Date(inicio);
                        fin.setDate(inicio.getDate() + 6);
                        setSemanaFin(fin.toISOString().split('T')[0]);
                      }}
                      className="w-40 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="text-gray-400 mt-7">al</div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hasta
                    </label>
                    <input
                      type="date"
                      value={semanaFin}
                      onChange={(e) => setSemanaFin(e.target.value)}
                      className="w-40 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg mb-8">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Semana Completa de Registro</h3>
                <p className="text-blue-100 opacity-90">
                  {semanaInicio && semanaFin
                    ? `${new Date(semanaInicio).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - ${new Date(semanaFin).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`
                    : "Selecciona el rango de la semana"}
                </p>
              </div>
              <div className="flex items-center space-x-6 mt-4 lg:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-blue-100">Días</div>
                </div>
                <div className="h-12 w-1 bg-blue-400/50 rounded-full"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-sm text-blue-100">Comidas/día</div>
                </div>
                <div className="h-12 w-1 bg-blue-400/50 rounded-full"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-blue-100">Categorías</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table - Por Días */}
        <div className="space-y-6">
          {diasSemana.map((dia, diaIndex) => (
            <div key={dia} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Day Header */}
              <div className={`px-6 py-4 ${getDiaColor(diaIndex)} border-b`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${diaIndex === 0 ? 'bg-blue-500' :
                      diaIndex === 1 ? 'bg-green-500' :
                        diaIndex === 2 ? 'bg-purple-500' :
                          diaIndex === 3 ? 'bg-amber-500' :
                            diaIndex === 4 ? 'bg-red-500' :
                              diaIndex === 5 ? 'bg-indigo-500' : 'bg-cyan-500'
                      }`}></div>
                    <h3 className="text-xl font-bold text-gray-900">{dia}</h3>
                    <span className="ml-3 px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border">
                      Día {diaIndex + 1}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {semanaInicio && (
                      <>
                        {new Date(new Date(semanaInicio).setDate(new Date(semanaInicio).getDate() + diaIndex))
                          .toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Meals Table for this Day */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-r">
                        Comida
                      </th>
                      {categorias.map((categoria, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          <div className="flex items-center justify-center text-center">
                            <span className="inline-block px-2 py-1 bg-white rounded-lg border border-gray-200 text-xs">
                              {categoria}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {comidasDia.map((comida, comidaIndex) => (
                      <tr
                        key={comidaIndex}
                        className={`hover:bg-gray-50 transition-all duration-200 ${getComidaColor(comidaIndex)}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap border-r">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-3 ${comidaIndex === 0 ? 'bg-orange-500' :
                              comidaIndex === 1 ? 'bg-yellow-500' :
                                comidaIndex === 2 ? 'bg-emerald-500' :
                                  comidaIndex === 3 ? 'bg-lime-500' :
                                    comidaIndex === 4 ? 'bg-blue-500' : 'bg-indigo-500'
                              }`}></div>
                            <div>
                              <div className="font-semibold text-gray-900">{comida}</div>
                              <div className="text-xs text-gray-500">
                                {comidaIndex === 0 ? '06:00 - 09:00' :
                                  comidaIndex === 1 ? '10:00 - 11:00' :
                                    comidaIndex === 2 ? '13:00 - 15:00' :
                                      comidaIndex === 3 ? '16:00 - 17:00' :
                                        comidaIndex === 4 ? '19:00 - 21:00' : '22:00 - 23:00'}
                              </div>
                            </div>
                          </div>
                        </td>
                        {categorias.map((categoria, catIndex) => (
                          <td key={catIndex} className="px-4 py-4">
                            <input
                              type="text"
                              value={recordData[diaIndex][comidaIndex][catIndex]}
                              onChange={(e) => handleInputChange(diaIndex, comidaIndex, catIndex, e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                              placeholder={categoria === "Hora" ? "HH:MM" : `Escriba ${categoria.toLowerCase()}...`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Observaciones Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Observaciones Semanales</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Patrones observados, dificultades, logros, recomendaciones generales para la semana.
            </p>
          </div>
          <textarea
            rows={4}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Escribe aquí las observaciones generales de la semana..."
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Instrucciones de Registro Semanal</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                  Completa todas las comidas para cada día de la semana
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                  Registra alimentos, cantidades, horas exactas y lugares
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                  Incluye síntomas después de cada comida y estado de ánimo general
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                  El consumo de agua se refiere al promedio diario de toda la semana
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2 flex-shrink-0"></span>
                  Usa las observaciones para notas importantes que apliquen a toda la semana
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Regresar</span>
          </button>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setRecordData(initializeState());
                setAguaPromedio("");
                setObservaciones("");
                Utils.swalInfo("Formulario semanal limpiado");
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="font-medium">Limpiar Todo</span>
            </button>

            <button
              onClick={exportarPDF}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:from-green-700 hover:to-green-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Exportar PDF</span>
            </button>

            <button
              onClick={handleGuardarRecordatorio}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold">Guardar Semana Completa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}