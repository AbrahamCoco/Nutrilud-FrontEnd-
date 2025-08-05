"use client";
import Clock from "@/components/Clock";
import Itinerario from "@/components/Itinerario";
import { NutriologoController } from "@/controllers/nutriologo/agendaController";
import { JSX, useEffect, useState } from "react";

export default function NutriologoPage() {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const loadAgenda = async () => {
      try {
        const response = await NutriologoController.getAgenda(parseInt(sessionStorage.getItem("id_nutriologo") || "0"));
        setEventos(response || []);
      } catch (error) {
        setEventos([]);
      }
    };

    loadAgenda();
  }, []);

  const formatearZonaHoraria = (tz: string) => {
    const partes = tz.split("/");
    if (partes.length === 2) {
      const continente = partes[0]
        .replace("_", " ")
        .replace("America", "América")
        .replace("Europe", "Europa")
        .replace("Asia", "Asia");
      const ciudad = partes[1].replace(/_/g, " ");
      return `${continente} / ${ciudad}`;
    }
    return tz;
  };

  const renderCard = (header: string | JSX.Element, body: string | JSX.Element) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="bg-green-600 px-4 py-3">
        <h3 className="text-lg font-semibold text-white">{header}</h3>
      </div>
      <div className="p-4">
        <div className="text-center text-gray-700">
          {typeof body === "string" ? <p className="text-lg">{body}</p> : body}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Nutriólogo
        </h1>
        <p className="text-gray-600 mt-2">Bienvenido a tu panel de control</p>
      </div>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Tarjeta Notificaciones */}
        <div>
          {renderCard("Notificaciones", "No hay notificaciones nuevas")}
        </div>

        {/* Tarjeta Fecha y Hora */}
        <div className="h-full">
          {" "}
          {/* Asegura misma altura que otras tarjetas */}
          {renderCard(
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Fecha y Hora Actual</span>
            </div>,
            <div className="space-y-4 p-1">
              {/* Fecha */}
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-lg font-semibold text-green-800">
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Reloj */}
              <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                <Clock className="text-2xl md:text-3xl font-bold text-gray-800" />
              </div>

              {/* Indicador de zona horaria */}
              <p className="text-xs text-gray-500 text-center">
                Tu zona horaria actual es:{" "}
                {formatearZonaHoraria(
                  Intl.DateTimeFormat().resolvedOptions().timeZone
                )}
              </p>
            </div>
          )}
        </div>

        {/* Tarjeta Itinerario */}
        {eventos ? (
          <Itinerario eventos={eventos} />
        ) : (
          renderCard("Itinerario", "No hay eventos programados")
        )}
      </div>

      {/* Sección adicional */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Resumen de actividades
        </h2>
        <p className="text-gray-600">
          Aquí puedes ver un resumen de tus consultas y pacientes.
        </p>
      </div>
    </div>
  );
}