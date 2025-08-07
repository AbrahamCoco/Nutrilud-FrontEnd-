"use client";
import NuevoPaciente from "@/components/users/nutriologo/NuevoPaciente";
import TablaPacientes from "@/components/users/nutriologo/TablaPacientes";
import { PacientesController } from "@/controllers/nutriologo/pacientesController";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  

  const loadPacientes = async () => {
    try {
      const response = await PacientesController.getAllPacientes();
      setPacientes(response);
    } catch (error) {
      setPacientes([]);
    }
  }

  useEffect(() => {
    loadPacientes();
  }, []);

  const deleteAppClientCache = (id: number) => async () => {
    try {
      const response = await PacientesController.deletePaciente(id);
      loadPacientes();
      return response;
    } catch (error) {
      return null;
    }
  };

  const columns = [
    {
      name: "No.",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: any) => `${row.nombrePaciente}`,
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row: any) => row.sexo,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row: any) => row.correo,
      sortable: true,
    },
    {
      name: "Teléfono",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Link href={`https://wa.me/${row.telefono}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors">
            <span className="flex items-center gap-1">
              {row.telefono} 
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </span>
          </Link>
        </div>
      ),
    },
    {
      name: "Estadísticas",
      cell: (row:any) => (
        <Link href={`/nutriologo/pacientes/estadisticas/${row.id_paciente}`} className="flex justify-center">
          <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14zM9 17H7v-5h2v5zm4 0h-2v-7h2v7zm4 0h-2v-9h2v9z"/>
            </svg>
          </button>
        </Link>
      ),
    },
    {
      name: "Consulta",
      cell: (row: any) => (
        <Link href={`/nutriologo/pacientes/consulta/${row.id_paciente}`} className="flex justify-center">
          <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
            </svg>
          </button>
        </Link>
      ),
    },
    {
      name: "Modificar",
      cell: (row: any) => (
        <div className="flex justify-center">
          <button onClick={() => console.log(row)} className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>
      ),
    },
    {
      name: "Eliminar",
      cell: (row: any) => (
        <div className="flex justify-center">
          <button onClick={deleteAppClientCache(row.id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gestión de Pacientes
        </h1>

        <NuevoPaciente data={pacientes} />
      </div>

      <TablaPacientes columns={columns} data={pacientes} />
    </div>
  );
}
