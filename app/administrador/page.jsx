export default function Administrador() {
  return (
    <div className="mx-auto px-2 sm:px-2 lg:px-3 py-3">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Buenos días, Administrador</h1>
            <p className="text-gray-500 mt-1">Aquí tienes un resumen de tu panel</p>
          </div>
          <div className="hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        {/* Sección de estadísticas (puedes agregar contenido real aquí) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-800">Usuarios registrados</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">1,248</p>
            <p className="text-sm text-indigo-500 mt-1">+12% este mes</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h3 className="text-lg font-medium text-green-800">Consultas hoy</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">56</p>
            <p className="text-sm text-green-500 mt-1">+5% desde ayer</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
            <h3 className="text-lg font-medium text-purple-800">Artículos publicados</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">24</p>
            <p className="text-sm text-purple-500 mt-1">+2 esta semana</p>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-700">Agregar usuario</span>
            </button>

            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-700">Generar reporte</span>
            </button>

            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-700">Editar contenido</span>
            </button>

            <button className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="mt-2 text-sm font-medium text-gray-700">Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
