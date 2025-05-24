import moment from "moment";
import "moment/locale/es";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

moment.locale("es");

export default function Itinerario({ eventos }) {
  const [semanaActual, setSemanaActual] = useState(moment().startOf("week"));
  const eventosSemana = eventos.filter(
    (ev) =>
      moment(ev.start).isSameOrAfter(semanaActual) &&
      moment(ev.start).isBefore(semanaActual.clone().add(1, "week"))
  );

  const handleSemanaAnterior = () => {
    setSemanaActual(semanaActual.clone().subtract(1, "week"));
  };

  const handleSemanaSiguiente = () => {
    setSemanaActual(semanaActual.clone().add(1, "week"));
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Encabezado */}
      <div className="bg-green-600 px-4 py-3 flex items-center">
        <FaCalendarAlt className="text-white mr-2" />
        <h3 className="text-lg font-semibold text-white flex-grow text-center">
          {semanaActual.format("D MMMM YYYY")} -{" "}
          {semanaActual.clone().endOf("week").format("D MMMM YYYY")}
        </h3>
      </div>

      {/* Controles de navegación */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <button
          onClick={handleSemanaAnterior}
          className="flex items-center justify-center p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200"
          aria-label="Semana anterior"
        >
          <FaArrowLeft />
        </button>

        <span className="text-sm font-medium text-gray-600">
          Semana del {semanaActual.format("D")} al{" "}
          {semanaActual.clone().endOf("week").format("D [de] MMMM")}
        </span>

        <button
          onClick={handleSemanaSiguiente}
          className="flex items-center justify-center p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200"
          aria-label="Semana siguiente"
        >
          <FaArrowRight />
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
                    {moment(evento.start).format("HH:mm")}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{evento.title}</h4>
                  <p className="text-sm text-gray-500">
                    {moment(evento.start).format("dddd, D MMMM")} •{" "}
                    {moment(evento.start).format("HH:mm")} -{" "}
                    {moment(evento.end).format("HH:mm")}
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
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                Agendar nueva cita
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
