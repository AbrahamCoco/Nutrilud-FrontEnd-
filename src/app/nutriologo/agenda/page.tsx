"use client";
import CalendarMonths from "@/components/users/nutriologo/CalendarMonths";
import Itinerario from "@/components/users/nutriologo/Itinerario";
import { AgendaController } from "@/controllers/nutriologo/agendaController";
import { Utils } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function AgendaPage() {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const response = await AgendaController.getAgenda(Number(sessionStorage.getItem("id_nutriologo")));
        setEventos(response ?? []);
        Utils.swalSuccess("Agenda cargada correctamente.");
      } catch (error) {
        setEventos([]);
        Utils.swalError("Error al cargar la agenda. Intente nuevamente.");
      }
    }

    loadAgenda();
  }, [])

  return (
    <div className="mx-auto px-2 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Calendario - Agenda</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <CalendarMonths eventos={eventos} />
        </div>

        <div className="lg:w-1/3">
          <Itinerario eventos={eventos} />
        </div>
      </div>
    </div>
  );
}