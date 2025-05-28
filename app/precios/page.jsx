import Image from "next/image";

export default function PreciosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Nuestros <span className="text-green-600">Servicios</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">Soluciones nutricionales personalizadas para cada necesidad</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <Image src="/images/precio1.jpg" alt="Consulta Nutricional" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-900">Consulta Nutricional</h3>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Popular</span>
              </div>
              <p className="text-gray-600 mb-6">Evaluación inicial completa con análisis de hábitos alimenticios y metas personales.</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Desde</p>
                  <p className="text-3xl font-bold text-green-600">$500</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Reservar
                </button>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <Image src="/images/precio2.jpg" alt="Plan de Alimentación" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Plan de Alimentación</h3>
              <p className="text-gray-600 mb-6">Programa personalizado con recetas, menús semanales y guía nutricional detallada.</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Desde</p>
                  <p className="text-3xl font-bold text-green-600">$800</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Reservar
                </button>
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="h-48 overflow-hidden">
              <Image src="/images/precio3.jpg" alt="Seguimiento Nutricional" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Seguimiento Nutricional</h3>
              <p className="text-gray-600 mb-6">Acompañamiento profesional para ajustar tu plan según resultados y evolución.</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Desde</p>
                  <p className="text-3xl font-bold text-green-600">$300</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-green-50 rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas algo más personalizado?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">Ofrecemos paquetes combinados y programas especializados para deportistas, condiciones médicas y objetivos específicos.</p>
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Contactar para un plan personalizado
          </button>
        </div>
      </div>
    </div>
  );
}
