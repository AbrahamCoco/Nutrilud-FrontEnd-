export default function PacientePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, Juan Pérez!
          </h1>
          <p className="text-gray-600">
            Aquí puedes gestionar tu plan nutricional y seguir tu progreso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                  <h3 className="ml-3 text-sm font-medium text-gray-500">
                    Peso Actual
                  </h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">72.5 kg</p>
                <p className="text-sm text-green-500 flex items-center">
                  <span>↓ 2.3 kg</span>
                  <span className="ml-1 text-xs">desde inicio</span>
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="ml-3 text-sm font-medium text-gray-500">
                    Progreso Semanal
                  </h3>
                </div>
                <p className="mt-2 text-2xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-gray-500">Objetivos cumplidos</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                  </div>
                  <h3 className="ml-3 text-sm font-medium text-gray-500">
                    Próxima Cita
                  </h3>
                </div>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  15 Nov, 2024
                </p>
                <p className="text-sm text-gray-500">10:00 AM</p>
              </div>
            </div>

            {/* Plan Alimenticio */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Plan Alimenticio de Hoy
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Ver plan completo
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600">☀️</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">Desayuno</h3>
                      <p className="text-sm text-gray-500">7:00 AM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">Avena con frutas</p>
                    <p className="text-sm text-gray-500">350 kcal</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🌞</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">Almuerzo</h3>
                      <p className="text-sm text-gray-500">1:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">Ensalada con pollo</p>
                    <p className="text-sm text-gray-500">450 kcal</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">🌙</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">Cena</h3>
                      <p className="text-sm text-gray-500">7:00 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">Pescado al horno</p>
                    <p className="text-sm text-gray-500">400 kcal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progreso */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tu Progreso
              </h2>
              <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Gráfico de progreso se mostrará aquí</p>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Acciones Rápidas */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📝</span>
                  </div>
                  <span className="ml-3 font-medium text-gray-700">
                    Registrar Medidas
                  </span>
                </button>

                <button className="w-full flex items-center p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </div>
                  <span className="ml-3 font-medium text-gray-700">
                    Reportar Síntomas
                  </span>
                </button>

                <button className="w-full flex items-center p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">💬</span>
                  </div>
                  <span className="ml-3 font-medium text-gray-700">
                    Mensaje al Nutriólogo
                  </span>
                </button>
              </div>
            </div>

            {/* Recordatorios */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recordatorios
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Tomar 2L de agua hoy
                    </p>
                    <p className="text-xs text-gray-500">Diario</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Ejercicio 30 min
                    </p>
                    <p className="text-xs text-gray-500">Lunes, Miércoles, Viernes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      Tomar suplementos
                    </p>
                    <p className="text-xs text-gray-500">Después del desayuno</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logros */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Logros
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-600 text-2xl">🏆</span>
                  </div>
                  <p className="text-xs text-gray-600">1ra Semana</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400 text-2xl">⭐</span>
                  </div>
                  <p className="text-xs text-gray-600">Meta Peso</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-gray-400 text-2xl">📈</span>
                  </div>
                  <p className="text-xs text-gray-600">Progreso 75%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}