"use client";
import { RecordatorioController } from "@/controllers/nutriologo/recordatorioController";
import { getAuthPayload } from "@/utils/auth";
import { Utils } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function NewRecordatoriosPage({ params }: { params: Promise<{ id: string }> }) {
  const comidas: string[] = [
    "Desayuno",
    "Almuerzo",
    "Comida",
    "Cena",
    "Colación",
  ];

  const router = useRouter();
  const { id } = use(params);

  const [hora, setHora] = useState<string[]>(Array(comidas.length).fill(""));
  const [lugar, setLugar] = useState<string[]>(Array(comidas.length).fill(""));
  const [alimentos, setAlimentos] = useState<string[]>(Array(comidas.length).fill(""));
  const [porciones, setPorciones] = useState<string[]>(Array(comidas.length).fill(""));
  const [marca, setMarca] = useState<string[]>(Array(comidas.length).fill(""));
  const [preparacion, setPreparacion] = useState<string[]>(Array(comidas.length).fill(""));
  const [otros, setOtros] = useState<string>("");
  const [observaciones, setObservaciones] = useState<string>("");

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleGuardarRecordatorio = async () => {
    const payload = getAuthPayload();

    const json = {
      nutriologo_id: Number(payload?.id_nutriologo),
      paciente_id: Number(id),
      otros,
      observaciones,
      tdata_recordatorio: {
        comida: comidas,
        hora,
        lugar,
        alimentos,
        porciones,
        marca,
        preparacion,
      },
    };

    try {
      await RecordatorioController.addRecordatorio(json);
      setHora(Array(comidas.length).fill(""));
      setLugar(Array(comidas.length).fill(""));
      setAlimentos(Array(comidas.length).fill(""));
      setPorciones(Array(comidas.length).fill(""));
      setMarca(Array(comidas.length).fill(""));
      setPreparacion(Array(comidas.length).fill(""));
      setOtros("");
      setObservaciones("");
      router.push(`/nutriologo/pacientes/consulta/${id}/history_recordatorios`);
    } catch (error) {
      Utils.swalWarning("No se pudo guardar el recordatorio. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recordatorio de 24 Horas
            </h1>
            <p className="text-gray-600">Registro detallado de su consumo alimentario</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Comida", "Hora", "Lugar", "Alimentos", "Porciones", "Marca", "Preparación"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {header}
                      {header === "Hora" && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comidas.map((meal, i) => (
                <tr key={meal} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-50 flex items-center justify-center mr-3">
                        <span className="text-green-600 font-medium">{i+1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{meal}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <input
                        type="time"
                        value={hora[i]}
                        onChange={(e) => handleChange(setHora, i, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={lugar[i]}
                      onChange={(e) => handleChange(setLugar, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Ej: Casa, Restaurante"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={alimentos[i]}
                      onChange={(e) => handleChange(setAlimentos, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Qué comió"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={porciones[i]}
                      onChange={(e) => handleChange(setPorciones, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Cantidad"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={marca[i]}
                      onChange={(e) => handleChange(setMarca, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Marca comercial"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={preparacion[i]}
                      onChange={(e) => handleChange(setPreparacion, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      placeholder="Cómo se preparó"
                    />
                  </td>
                </tr>
              ))}

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Otros
                </td>
                <td colSpan={6} className="px-6 py-4">
                  <input
                    type="text"
                    value={otros}
                    onChange={(e) => setOtros(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Bebidas, snacks, suplementos, etc."
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Comentarios
                </td>
                <td colSpan={6} className="px-6 py-4">
                  <textarea
                    rows={3}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Observaciones importantes, síntomas, etc."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Regresar
          </button>
          <button
            onClick={handleGuardarRecordatorio}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Guardar Recordatorio
          </button>
        </div>
      </div>
    </div>
  );
}