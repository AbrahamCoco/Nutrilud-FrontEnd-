"use client";
export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
            {/* Contenedor principal con animación */}
            <div className="text-center space-y-8 p-8">

                {/* Logo/Loader animado */}
                <div className="relative mx-auto w-32 h-32">
                    {/* Círculo pulsante externo */}
                    <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-75"></div>

                    {/* Círculo pulsante medio */}
                    <div className="absolute inset-2 rounded-full bg-green-300 animate-pulse"></div>

                    {/* Círculo interior */}
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">N</span>
                    </div>
                </div>

                {/* Texto de carga */}
                <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 animate-pulse">
                        Nutrilud
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                        Cargando contenido...
                    </p>
                </div>

                {/* Barra de progreso animada */}
                <div className="w-48 sm:w-64 mx-auto">
                    <div className="h-1 bg-green-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-600 to-green-700 rounded-full animate-progress"></div>
                    </div>
                </div>
            </div>

            {/* Estilos personalizados para animaciones */}
            <style jsx>{`
                @keyframes progress {
                0% {
                    width: 0%;
                    opacity: 0.5;
                }
                50% {
                    width: 70%;
                    opacity: 1;
                }
                100% {
                    width: 100%;
                    opacity: 0.5;
                }
                }
                
                .animate-progress {
                animation: progress 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}