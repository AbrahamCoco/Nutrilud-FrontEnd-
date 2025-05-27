"use client";
import CalendarMonths from "@/app/components/CalendarMonths";
import Itinerario from "@/app/components/Itinerario";
import { useEffect, useState } from "react";
import { NutriologoController } from "./agendaController";

export default function Agenda() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const response = await NutriologoController.getAgenda(sessionStorage.getItem("id_nutriologo"));
        setEventos(response);
      } catch (error) {
        setEventos(null);
      }
    };
    loadAgenda();
  }, []);

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
