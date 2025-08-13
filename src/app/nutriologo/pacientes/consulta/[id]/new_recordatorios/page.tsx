"use client";
import { RecordatorioController } from "@/controllers/nutriologo/recordatorioController";
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
    const json = {
      nutriologo_id: Number(sessionStorage.getItem("id_nutriologo")),
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recordatorio de 24 hrs</h1>
        <p className="text-gray-600 mb-6">Complete su registro alimenticio diario</p>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Comida", "Hora", "Lugar", "Alimentos", "Porciones", "Marca", "Preparación"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comidas.map((meal, i) => (
                <tr key={meal} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{meal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="time"
                      value={hora[i]}
                      onChange={(e) => handleChange(setHora, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={lugar[i]}
                      onChange={(e) => handleChange(setLugar, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={alimentos[i]}
                      onChange={(e) => handleChange(setAlimentos, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={porciones[i]}
                      onChange={(e) => handleChange(setPorciones, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={marca[i]}
                      onChange={(e) => handleChange(setMarca, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={preparacion[i]}
                      onChange={(e) => handleChange(setPreparacion, i, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </td>
                </tr>
              ))}

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Otros</td>
                <td colSpan={6} className="px-6 py-4">
                  <input
                    type="text"
                    value={otros}
                    onChange={(e) => setOtros(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Detalles adicionales"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Comentarios</td>
                <td colSpan={6} className="px-6 py-4">
                  <textarea
                    rows={2}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Notas adicionales sobre su alimentación"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Regresar
          </button>
          <button
            onClick={handleGuardarRecordatorio}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
          >
            Guardar recordatorio
          </button>
        </div>
      </div>
    </div>
  );
}