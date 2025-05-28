import Image from "next/image";

export default function ServiciosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Servicios de Nutrición para ti</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Descubre nuestros servicios profesionales diseñados para ayudarte a alcanzar tus metas de salud y bienestar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="h-48 overflow-hidden">
            <Image src="/images/servicio1.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Consulta Nutricional" />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Consulta Nutricional</h3>
            </div>
            <p className="text-gray-600 mb-6">Consulta personalizada con un nutriólogo certificado para evaluar tus necesidades y objetivos.</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Más información</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="h-48 overflow-hidden">
            <Image src="/images/servicio2.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Plan de Alimentación" />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Plan de Alimentación</h3>
            </div>
            <p className="text-gray-600 mb-6">Plan personalizado adaptado a tus gustos, necesidades y objetivos de salud.</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Más información</button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="h-48 overflow-hidden">
            <Image src="/images/servicio3.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Seguimiento Nutricional" />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Seguimiento Nutricional</h3>
            </div>
            <p className="text-gray-600 mb-6">Acompañamiento continuo para asegurar el éxito de tu plan nutricional.</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Más información</button>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar tu viaje nutricional?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Agenda una cita con nuestros especialistas y da el primer paso hacia una vida más saludable.</p>
        <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg">Agendar cita ahora</button>
      </div>
    </div>
  );
}
