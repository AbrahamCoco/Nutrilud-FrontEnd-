"use client";

import dayjs from "dayjs";
import localeEs from "dayjs/locale/es";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Link from "next/link";
import { useState } from "react";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrAfter);
dayjs.extend(advancedFormat);
dayjs.locale(localeEs);

interface Evento {
  id?: number | string;
  title: string;
  description?: string;
  start: string;
  end: string;
}

interface Props {
  eventos: Evento[];
}

export default function Itinerario({ eventos }: Props) {
  const [semanaActual, setSemanaActual] = useState(dayjs().startOf("week"));
  
  const eventosSemana = eventos.filter(
    (ev) =>
      dayjs(ev.start).isSameOrAfter(semanaActual) &&
      dayjs(ev.start).isBefore(semanaActual.add(1, "week"))
  );

  const handleSemanaAnterior = () => {
    setSemanaActual(semanaActual.subtract(1, "week"));
  };

  const handleSemanaSiguiente = () => {
    setSemanaActual(semanaActual.add(1, "week"));
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Encabezado */}
      <div className="bg-green-600 px-4 py-3 flex items-center">
        <svg className="text-white mr-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
        </svg>
        <h3 className="text-lg font-semibold text-white flex-grow text-center">
          {semanaActual.format("D MMMM YYYY")} -{" "}
          {semanaActual.endOf("week").format("D MMMM YYYY")}
        </h3>
      </div>

      {/* Controles */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <button
          onClick={handleSemanaAnterior}
          className="flex items-center justify-center p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
          </svg>
        </button>

        <span className="text-sm font-medium text-gray-600">
          Semana del {semanaActual.format("D")} al{" "}
          {semanaActual.endOf("week").format("D [de] MMMM")}
        </span>

        <button
          onClick={handleSemanaSiguiente}
          className="flex items-center justify-center p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
      </div>

      {/* Lista de eventos */}
      <div className="divide-y divide-gray-100">
        {eventosSemana.length > 0 ? (
          eventosSemana.map((evento, index) => (
            <div
              key={evento.id || index}
              className="p-4 hover:bg-green-50 transition-colors duration-150"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm font-medium">
                    {dayjs(evento.start).format("HH:mm")}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{evento.title}</h4>
                  <p className="text-sm text-gray-500">
                    {dayjs(evento.start).format("dddd, D MMMM")} •{" "}
                    {dayjs(evento.start).format("HH:mm")} -{" "}
                    {dayjs(evento.end).format("HH:mm")}
                  </p>
                  {evento.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {evento.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-400">
              No hay eventos programados esta semana
            </p>
            <Link href={"/nutriologo/pacientes"}>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                Agendar nueva cita
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
