"use client";
import { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSendEmail = () => {
    const adminEmail = "karinetza09@gmail.com";
    const subject = encodeURIComponent(`Consulta de ${nombre}`);
    const body = encodeURIComponent(`Hola, mi nombre es ${nombre}.\n\n${mensaje}`);

    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className=" bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Contáctanos</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">Estamos aquí para ayudarte en tu camino nutricional</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Información de contacto */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Información de contacto</h2>

              <p className="text-gray-600 mb-6">¡Gracias por visitarnos! Estamos aquí para ayudarte. Por favor, no dudes en contactarnos si tienes alguna pregunta, comentario o solicitud.</p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Horario de atención</h3>
                    <p className="text-sm text-gray-500">Lunes a Viernes de 9:00 A.M. a 5:00 P.M.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Teléfono</h3>
                    <p className="text-sm text-gray-500">246 265 3921</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Email</h3>
                    <p className="text-sm text-gray-500">karinetza09@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ubicación</h2>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                {/* Aquí puedes integrar un mapa de Google Maps o similar 
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <p className="text-gray-500">Mapa de ubicación</p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>

            <div className="space-y-5">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="nombre"
                    className="focus:ring-green-500 focus:border-green-500 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="email"
                    id="email"
                    className="focus:ring-green-500 focus:border-green-500 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <div className="relative rounded-md shadow-sm">
                  <textarea
                    id="mensaje"
                    rows={4}
                    className="focus:ring-green-500 focus:border-green-500 block w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Escribe tu mensaje aquí..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSendEmail}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Enviar mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
