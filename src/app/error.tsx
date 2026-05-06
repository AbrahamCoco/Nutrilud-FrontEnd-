"use client";
import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log del error a tu servicio de monitoreo
        console.error("Error capturado:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full mx-auto">

                {/* Tarjeta de error */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 animate-slideUp">

                    {/* Cabecera con gradiente */}
                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-8 text-center">
                        <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">
                            ¡Algo salió mal!
                        </h1>
                        <p className="text-red-100 text-sm">
                            Hemos detectado un error inesperado
                        </p>
                    </div>

                    {/* Contenido del error */}
                    <div className="p-6 space-y-6">
                        {/* Mensaje de error (solo en desarrollo) */}
                        {process.env.NODE_ENV === "development" && (
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <p className="text-xs font-mono text-gray-600 break-all">
                                    {error.message || "Error desconocido"}
                                </p>
                                {error.digest && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        ID: {error.digest}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Mensaje amigable para el usuario */}
                        <div className="text-center space-y-2">
                            <p className="text-gray-600">
                                Lo sentimos, ha ocurrido un error al cargar esta página.
                            </p>
                            <p className="text-sm text-gray-500">
                                Por favor, intenta nuevamente o contacta a soporte si el problema persiste.
                            </p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button
                                onClick={reset}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Intentar nuevamente
                                </span>
                            </button>

                            <Link
                                href="/"
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Ir al inicio
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Información de soporte */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        ¿Necesitas ayuda?{" "}
                        <Link href="/contacto" className="text-green-600 hover:text-green-700 font-medium">
                            Contacta a soporte
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                }
                
                .animate-slideUp {
                animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}