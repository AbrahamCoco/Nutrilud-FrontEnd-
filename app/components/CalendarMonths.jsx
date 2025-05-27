"use client";
import { useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

moment.locale("es");

export default function CalendarMonths({ eventos }) {
  const [mesActual, setMesActual] = useState(moment().startOf("month"));
  const [showToasts, setShowToasts] = useState([]);
  const diasMes = Array.from({ length: mesActual.daysInMonth() }, (_, i) => mesActual.clone().date(i + 1));

  const handleMesAnterior = () => {
    setMesActual(mesActual.clone().subtract(1, "month"));
  };

  const handleMesSiguiente = () => {
    setMesActual(mesActual.clone().add(1, "month"));
  };

  const handleShowToast = (fecha, eventosDia) => {
    const eventosDelDia = eventosDia.filter((ev) => moment(ev.start).isSame(fecha, "day"));
    setShowToasts(eventosDelDia.map((ev) => ({ id: Date.now(), title: ev.title })));
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleMesAnterior}
            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <h3 className="text-xl font-semibold text-gray-800">{mesActual.format("MMMM YYYY")}</h3>
          <button
            onClick={handleMesSiguiente}
            className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <FaArrowRight className="text-lg" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-gray-200">
                {moment.weekdaysShort(true).map((dia) => (
                  <th key={dia} className="py-3 px-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, semana) => (
                <tr key={semana} className="border-b border-gray-200">
                  {[...Array(7)].map((_, dia) => {
                    const fecha = diasMes.find((d) => d.week() === mesActual.week() + semana && d.isoWeekday() === dia + 1);
                    const eventosDia = eventos.filter((ev) => moment(ev.start).isSame(fecha, "day"));
                    return (
                      <td key={dia} className="py-3 px-2 h-12 w-12 md:h-16 md:w-16 relative">
                        {fecha && (
                          <div className="flex flex-col items-center justify-center h-full">
                            <span
                              className={`text-sm font-medium ${fecha.isSame(moment(), "day") ? "bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center" : "text-gray-900"}`}
                            >
                              {fecha.date()}
                            </span>
                            {eventosDia.length > 0 && (
                              <button onClick={() => handleShowToast(fecha, eventosDia)} className="mt-1 text-xs text-red-600 hover:text-red-800 focus:outline-none">
                                {eventosDia.length === 1 ? "Consulta" : "Consultas"}: {eventosDia.length}
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {showToasts.map((toast) => (
          <div key={toast.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-800">{toast.title}</div>
              <button onClick={() => setShowToasts(showToasts.filter((t) => t.id !== toast.id))} className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
