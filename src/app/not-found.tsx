import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center max-w-lg">

                {/* Animación 404 creativa */}
                <div className="relative mb-8">
                    <div className="text-8xl sm:text-9xl font-bold text-green-100 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent animate-bounce">
                            !
                        </div>
                    </div>
                </div>

                {/* Mensaje principal */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        ¡Ups! Página no encontrada
                    </h1>
                    <p className="text-gray-600">
                        Parece que te has perdido en el mundo de la nutrición.
                        La página que buscas no existe o fue movida a otro lugar.
                    </p>
                </div>

                {/* Banner motivacional */}
                <div className="bg-green-50 rounded-xl p-4 mb-8 border border-green-200">
                    <p className="text-green-700 text-sm italic">
                        Una alimentación saludable es el camino correcto,
                        al igual que volver al inicio cuando te pierdes 🌱
                    </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Volver al inicio
                    </Link>

                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-all duration-200 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contactar soporte
                    </Link>
                </div>

                {/* Enlaces rápidos */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">
                        Mientras tanto, puedes explorar:
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/articulos" className="text-green-600 hover:text-green-700 transition-colors">
                            📚 Artículos
                        </Link>
                        <Link href="/nutriologos" className="text-green-600 hover:text-green-700 transition-colors">
                            👨‍⚕️ Nutriólogos
                        </Link>
                        <Link href="/precios" className="text-green-600 hover:text-green-700 transition-colors">
                            💰 Precios
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}