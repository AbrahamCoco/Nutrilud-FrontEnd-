import { addDays, addMonths, endOfMonth, format, getDay, isWeekend, parse, setDefaultOptions, setHours, setMinutes, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
setDefaultOptions({ locale: es });

interface SelectorCitaModalProps {
  eventos: any[];
  onSelect: (fecha: string) => void; // <-- nueva prop
}

export default function SelectorCitaModal({ eventos, onSelect }: SelectorCitaModalProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Fecha mínima = hoy + 1 hora
  const today = new Date();
  today.setHours(today.getHours() + 1);
  const minDate = today;

  // Horas laborales (8:00 - 18:00 cada 30 minutos) => 20 slots 08:00..17:30
  const generateTimeSlots = () => {
    return Array.from({ length: 20 }, (_, i) => {
      const hour = 8 + Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      return `${hour.toString().padStart(2, "0")}:${minute}`;
    });
  };

  // Obtener horas ocupadas para la fecha seleccionada (tolera " " o "T")
  const getBookedTimes = (date: Date): string[] => {
    const dateStr = format(date, "yyyy-MM-dd");
    return eventos
      .filter((e) => {
        // Si "start" es Date, hay que formatearlo
        if (e.start instanceof Date) {
          return format(e.start, "yyyy-MM-dd") === dateStr;
        }
        return false;
      })
      .map((e) => {
        // Devolver solo la hora de inicio
        if (e.start instanceof Date) {
          return format(e.start, "HH:mm");
        }
        return "";
      })
      .filter(Boolean);
  };

  // Generar celdas del calendario (Lunes a Viernes) con huecos correctos
  const generateCalendar = () => {
    const days: (Date | null)[] = [];

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    // Primer día hábil (L-V) del mes
    let firstWeekday = new Date(monthStart);
    while (isWeekend(firstWeekday)) {
      firstWeekday = addDays(firstWeekday, 1);
    }

    // Offset: número de huecos antes del primer día hábil (Mon=1..Sun=7) -> 0..4
    // getDay: Sunday=0, Monday=1, ..., Friday=5
    const offset = getDay(firstWeekday) === 0 ? 6 : getDay(firstWeekday) - 1;
    for (let i = 0; i < offset; i++) days.push(null);

    // Recorremos todo el mes, agregando SOLO L-V; sáb y dom NO ocupan columna
    for (let d = new Date(firstWeekday); d <= monthEnd; d = addDays(d, 1)) {
      if (isWeekend(d)) continue; // no ocupa celda

      // Si es antes de minDate -> dejar hueco para no correr el resto de la semana
      if (d < minDate) {
        days.push(null);
      } else {
        days.push(new Date(d));
      }
    }

    return days;
  };

  // Manejar selección de fecha
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setError(null);
    setSuccess(null);
  };

  // Manejar selección de hora
  const handleTimeSelect = (time: string) => {
    if (!selectedDate) return;

    const bookedTimes = getBookedTimes(selectedDate);
    if (bookedTimes.includes(time)) {
      setError("Este horario ya está ocupado");
      return;
    }

    setSelectedTime(time);
    setError(null);
    setSuccess("Horario disponible");
  };

  // Confirmar selección
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      setError("Por favor selecciona fecha y hora");
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const fechaFinal = new Date(selectedDate);
    fechaFinal.setHours(hours, minutes, 0, 0);

    // Guardar en formato "YYYY-MM-DD HH:mm:ss"
    const fechaCompleta = format(fechaFinal, "yyyy-MM-dd HH:mm:ss");

    // avisamos al padre
    onSelect(fechaCompleta);

    setShowModal(false);
    setSuccess("Cita agendada correctamente");
  };

  // Obtener la fecha completa con hora seleccionada
  const getDateTime = () => {
    if (!selectedDate) return null;
    if (!selectedTime) return selectedDate;

    const [hoursStr, minutesStr] = selectedTime.split(":");
    let dateWithTime = setHours(selectedDate, parseInt(hoursStr, 10));
    dateWithTime = setMinutes(dateWithTime, parseInt(minutesStr, 10));

    return dateWithTime;
  };

  return (
    <div className="space-y-4">
      {/* Input trigger */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`w-full px-4 py-3 text-left border rounded-lg shadow-sm transition-all ${
          eventos.length > 0 && eventos[0].siguiente_consulta
            ? "bg-green-50 border-green-500 text-green-700"
            : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
        }`}
      >
        Seleccionar fecha y hora
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Fondo */}
          <div
            className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Contenido */}
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full relative">
              <div className="bg-green-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Seleccionar fecha y hora
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                    className="p-2 rounded-full hover:bg-green-700/30 text-white"
                    aria-label="Mes anterior"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="font-medium text-white">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 rounded-full hover:bg-green-700/30 text-white"
                    aria-label="Mes siguiente"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Días de la semana (L-V) */}
                <div className="grid grid-cols-5 gap-1 mb-2">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendario L-V con huecos */}
                <div className="grid grid-cols-5 gap-1 mb-6">
                  {generateCalendar().map((day, idx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${idx}`}
                          className="py-2 rounded-md text-sm text-gray-300 bg-gray-50"
                        >
                          {/* hueco */}
                        </div>
                      );
                    }

                    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                    const hasAppointments = getBookedTimes(day).length > 0;

                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        className={`py-2 rounded-md text-sm transition-all ${
                          isSelected
                            ? "bg-green-600 text-white font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        } ${hasAppointments ? "border border-blue-200" : ""}`}
                        aria-label={format(day, "PPP")}
                      >
                        {format(day, "d")}
                        {hasAppointments && (
                          <span className="block w-1 h-1 mx-auto mt-1 rounded-full bg-blue-500"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selector de hora */}
                {selectedDate && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Horarios disponibles para el {format(selectedDate, "PPPP")}
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-1">
                      {generateTimeSlots().map((time) => {
                        const isBooked = getBookedTimes(selectedDate).includes(time);
                        const isSelected = selectedTime === time;

                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={isBooked}
                            onClick={() => !isBooked && handleTimeSelect(time)}
                            className={`py-2 text-sm rounded-md border transition-all ${
                              isSelected
                                ? "bg-green-600 text-white border-green-700"
                                : isBooked
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mensajes de estado */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {success}
                  </div>
                )}
              </div>

              {/* Botones del modal */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirmar cita
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visualización de la cita seleccionada */}
      {selectedDate && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <span className="font-medium text-green-700">
              Tu próxima cita es el{" "}
              {format(getDateTime()!, "PPPP")} a las{" "}
              {format(getDateTime()!, "HH:mm")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
