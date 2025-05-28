export default function NutriologosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Nutriólogos Certificados</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Conoce a nuestro equipo de profesionales especializados en nutrición y salud</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="relative h-64 overflow-hidden">
            <img src="/images/nutriologo1.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Nutriólogo 1" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dra. Ana Martínez</h3>
            <p className="text-green-600 font-medium mb-3">Especialista en Nutrición Clínica</p>
            <p className="text-gray-600 mb-4">Más de 10 años de experiencia ayudando a pacientes a mejorar su salud a través de la alimentación.</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Ver perfil</button>
              <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">Contactar</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="relative h-64 overflow-hidden">
            <img src="/images/nutriologo2.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Nutriólogo 2" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dr. Carlos Rodríguez</h3>
            <p className="text-green-600 font-medium mb-3">Especialista en Deportiva</p>
            <p className="text-gray-600 mb-4">Nutrición orientada al alto rendimiento y mejora de la composición corporal.</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Ver perfil</button>
              <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">Contactar</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="relative h-64 overflow-hidden">
            <img src="/images/nutriologo3.jpg" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" alt="Nutriólogo 3" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Dra. Laura Sánchez</h3>
            <p className="text-green-600 font-medium mb-3">Especialista en Nutrición Infantil</p>
            <p className="text-gray-600 mb-4">Enfoque en hábitos saludables para niños y adolescentes.</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">Ver perfil</button>
              <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">Contactar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda para elegir al nutriólogo ideal?</h2>
        <p className="mb-6 max-w-2xl mx-auto">Nuestros asesores te ayudarán a encontrar el profesional que mejor se adapte a tus necesidades.</p>
        <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg">Hablar con un asesor</button>
      </div>
    </div>
  );
}
