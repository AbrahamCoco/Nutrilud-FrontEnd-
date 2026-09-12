"use client";
import { PacienteController } from "@/controllers/paciente/pacienteController";
import { UserData } from "@/interfaces/userData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PacientePage() {
  const id = useParams();
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    nombre: "",
    foto: "",
    correo: "",
    telefono: "",
    direccion: "",
    cedula: 0,
    descripcion: "",
    especialidad: "",
    sexo: "",
    alergias: "",
    estatura: 0,
    pesoInicial: 0,
    peso: 0,
    imc: 0,
    porcentajeGrasa: 0,
    fechaNacimiento: "",
    proximaCita: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await PacienteController.getPacienteById(Number(id.id_paciente));
        setUserData(response);
      } catch {
        setUserData({
          id: 0,
          nombre: "",
          foto: "",
          correo: "",
          telefono: "",
          direccion: "",
          cedula: 0,
          descripcion: "",
          especialidad: "",
          sexo: "",
          alergias: "",
          estatura: 0,
          pesoInicial: 0,
          peso: 0,
          imc: 0,
          porcentajeGrasa: 0,
          fechaNacimiento: "",
          proximaCita: ""
        });
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (userData.id === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section Skeleton */}
          <div className="mb-8">
            <div className="h-9 bg-gray-200 rounded-lg w-1/3 mb-2 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Plan Alimenticio Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Progress Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
                <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                ¡Bienvenid@, <span className="text-blue-600">{userData?.nombre || "Paciente"}</span>!
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Aquí puedes gestionar tu plan nutricional y seguir tu progreso de manera sencilla y efectiva.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                <span className="text-sm text-gray-600">Hoy: </span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Overview Bar */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Tu Progreso General</h2>
                <p className="text-blue-100">Continúa con tu plan para alcanzar tus objetivos</p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">75%</div>
                    <div className="text-sm text-blue-100">Progreso</div>
                  </div>
                  <div className="h-12 w-1 bg-blue-400/50 rounded-full"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">28</div>
                    <div className="text-sm text-blue-100">Días activos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Peso Actual Card - Improved Version */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-sm">
                      <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-semibold text-gray-800">Peso Actual</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Última actualización</p>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${userData?.peso ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {userData?.peso ? 'Actualizado' : 'Sin datos'}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {userData?.peso ? `${userData.peso} kg` : '--'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {userData?.peso ? `Equivalente a ${(userData.peso * 2.20462).toFixed(1)} lbs` : 'Ingresa tu peso para comenzar'}
                  </p>
                </div>

                {userData?.peso && (
                  <div className="space-y-4 pt-5 border-t border-gray-100">
                    {/* Progreso */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${!userData?.pesoInicial || !userData?.peso ? 'bg-gray-400' :
                          userData.pesoInicial > userData.peso ? 'bg-green-500' :
                            userData.pesoInicial < userData.peso ? 'bg-red-500' : 'bg-yellow-500'
                          }`}></div>
                        <span className="text-sm font-medium text-gray-700">Progreso</span>
                      </div>

                      <div className="flex items-center">
                        {(() => {
                          // Si no hay datos suficientes
                          if (!userData?.pesoInicial || !userData?.peso) {
                            return <span className="text-sm text-gray-500">Completa tus datos</span>;
                          }

                          const diferencia = userData.pesoInicial - userData.peso;
                          const diferenciaAbsoluta = Math.abs(diferencia);

                          // Si no hay cambio significativo (menos de 0.1 kg)
                          if (diferenciaAbsoluta < 0.1) {
                            return (
                              <>
                                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                                </svg>
                                <span className="text-sm font-bold text-yellow-600">Sin cambio</span>
                                <span className="text-xs text-gray-500 ml-1">mantenido desde inicio</span>
                              </>
                            );
                          }

                          // Si perdió peso
                          if (diferencia > 0) {
                            return (
                              <>
                                <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <span className="text-sm font-bold text-green-600">
                                  {diferencia.toFixed(1)} kg
                                </span>
                                <span className="text-xs text-gray-500 ml-1">
                                  perdidos desde inicio
                                  <span className="block text-[10px] text-gray-400">
                                    ({((diferencia / userData.pesoInicial) * 100).toFixed(1)}% de tu peso inicial)
                                  </span>
                                </span>
                              </>
                            );
                          }

                          // Si ganó peso
                          return (
                            <>
                              <svg className="w-4 h-4 text-red-500 mr-1 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              <span className="text-sm font-bold text-red-600">
                                {diferenciaAbsoluta.toFixed(1)} kg
                              </span>
                              <span className="text-xs text-gray-500 ml-1">
                                ganados desde inicio
                                <span className="block text-[10px] text-gray-400">
                                  ({((diferenciaAbsoluta / userData.pesoInicial) * 100).toFixed(1)}% de aumento)
                                </span>
                              </span>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Indicadores de salud */}
                    <div className="space-y-3">
                      {userData?.estatura && (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-sm text-gray-600">Peso ideal</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {(24 * (userData.estatura ** 2)).toFixed(1)} kg
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              <span className="text-sm text-gray-600">Por perder</span>
                            </div>
                            <span className="text-sm font-bold text-orange-600">
                              {(userData.peso - (24 * (userData.estatura ** 2))).toFixed(1)} kg
                            </span>
                          </div>
                        </>
                      )}

                      {userData?.imc && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full mr-2"
                              style={{
                                backgroundColor: userData.imc > 30 ? '#ef4444' : userData.imc > 25 ? '#f97316' : '#10b981'
                              }}
                            ></div>
                            <span className="text-sm text-gray-600">Índice de Masa Corporal</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-sm font-bold ${userData.imc > 30 ? 'text-red-600' :
                              userData.imc > 25 ? 'text-orange-600' :
                                'text-green-600'
                              }`}>
                              {userData.imc.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              {userData.imc > 30 ? 'Obesidad' :
                                userData.imc > 25 ? 'Sobrepeso' :
                                  userData.imc > 18.5 ? 'Normal' : 'Bajo peso'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Barra de progreso visual */}
                    {userData?.estatura && (
                      <div className="pt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Actual: {userData.peso} kg</span>
                          <span>Meta: {(24 * (userData.estatura ** 2)).toFixed(0)} kg</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(100, ((24 * (userData.estatura ** 2)) / userData.peso) * 100)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!userData?.peso && (
                  <button className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center group">
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Registrar Peso
                  </button>
                )}
              </div>

              {/* Progreso Semanal Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-sm">
                      <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-semibold text-gray-800">Progreso Semanal</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Esta semana</p>
                    </div>
                  </div>

                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    85%
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">85%</p>
                  <p className="text-sm text-gray-500 mt-1">Objetivos cumplidos</p>
                </div>

                <div className="space-y-4 pt-5 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Meta: 7/7 días</span>
                    <span>Logrado: 6/7 días</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 pt-2">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                      <div key={`weekday-${index}`} className="text-center">
                        <div className={`h-8 rounded-lg flex items-center justify-center text-sm font-medium ${index < 6 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                          }`}>
                          {day}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{index < 6 ? '✓' : '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Próxima Cita Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl shadow-sm">
                      <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-semibold text-gray-800">Próxima Cita</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Con el Dr. López</p>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${userData?.proximaCita ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {userData?.proximaCita ? 'Agendada' : 'No agendada'}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">
                    {userData?.proximaCita
                      ? new Date(userData.proximaCita).toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) + " hrs"
                      : "No hay citas programadas"}
                  </p>
                  {userData?.proximaCita && (
                    <p className="text-sm text-gray-500 mt-1">Consultorio 304, 3er piso</p>
                  )}
                </div>

                {userData?.proximaCita && (
                  <div className="flex space-x-3 pt-5 border-t border-gray-100">
                    <button className="flex-1 p-3 bg-purple-50 text-purple-700 rounded-xl font-medium hover:bg-purple-100 transition-colors duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver detalles
                    </button>
                    <button className="flex-1 p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
                      Confirmar
                    </button>
                  </div>
                )}

                {!userData?.proximaCita && (
                  <button className="w-full mt-4 p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group">
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Agendar Cita
                  </button>
                )}
              </div>
            </div>

            {/* Plan Alimenticio - Improved */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Plan Alimenticio de Hoy</h2>
                  <p className="text-gray-600 mt-1">Sigue tu dieta para alcanzar tus objetivos</p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <button className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                    Ver plan completo
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all">
                    Descargar PDF
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { time: "7:00 AM", meal: "Desayuno", name: "Avena con frutas frescas", calories: "350 kcal", color: "orange", icon: "☀️" },
                  { time: "10:00 AM", meal: "Colación", name: "Yogurt griego con almendras", calories: "150 kcal", color: "yellow", icon: "🍎" },
                  { time: "1:00 PM", meal: "Almuerzo", name: "Ensalada César con pollo a la plancha", calories: "450 kcal", color: "green", icon: "🌞" },
                  { time: "4:00 PM", meal: "Merienda", name: "Batido de proteínas", calories: "200 kcal", color: "blue", icon: "🥤" },
                  { time: "7:00 PM", meal: "Cena", name: "Pescado al horno con vegetales", calories: "400 kcal", color: "purple", icon: "🌙" },
                ].map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-5 bg-${item.color}-50 rounded-xl border border-${item.color}-100 hover:shadow-md transition-all duration-300 group`}>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="font-semibold text-gray-900">{item.meal}</h3>
                          <span className="ml-3 px-2 py-1 bg-white text-xs font-medium text-gray-600 rounded-full border">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-1">{item.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg">{item.calories}</p>
                      <div className="flex items-center justify-end mt-1">
                        <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full bg-${item.color}-500`} style={{ width: '80%' }}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">80%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total de calorías diarias</p>
                    <p className="text-2xl font-bold text-gray-900">1,550 kcal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Meta: 1,800 kcal</p>
                    <p className="text-sm font-medium text-green-600">86% cumplido</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progreso Gráfico - Improved */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tu Progreso</h2>
                  <p className="text-gray-600 mt-1">Evolución de peso en las últimas 12 semanas</p>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Semanal
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Mensual
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg">
                    Trimestral
                  </button>
                </div>
              </div>

              <div className="h-64 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-medium mb-2">Gráfico de progreso</p>
                  <p className="text-gray-500 text-sm max-w-md">
                    El gráfico mostrará tu evolución de peso, medidas corporales y porcentaje de grasa a lo largo del tiempo.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
                    Cargar datos anteriores
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Peso inicial</p>
                  <p className="text-xl font-bold text-gray-900">82.5 kg</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Peso actual</p>
                  <p className="text-xl font-bold text-gray-900">{userData?.peso || '--'} kg</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Diferencia</p>
                  <p className="text-xl font-bold text-green-600">-2.3 kg</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Tiempo transcurrido</p>
                  <p className="text-xl font-bold text-gray-900">4 semanas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-8">
            {/* Acciones Rápidas - Improved */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Acciones Rápidas</h2>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  3 nuevas
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "📝", title: "Registrar Medidas", desc: "Actualiza tus medidas corporales", color: "blue" },
                  { icon: "📊", title: "Reportar Síntomas", desc: "Comparte cómo te sientes hoy", color: "green" },
                  { icon: "💬", title: "Mensaje al Nutriólogo", desc: "Consulta tus dudas", color: "purple" },
                  { icon: "📷", title: "Subir Foto Progreso", desc: "Compara tu evolución", color: "orange" },
                  { icon: "🍎", title: "Registrar Comida", desc: "Agrega alimentos consumidos", color: "red" },
                ].map((action, index) => (
                  <button key={index} className={`w-full flex items-center p-4 text-left bg-${action.color}-50 hover:bg-${action.color}-100 rounded-xl transition-all duration-300 hover:shadow-md group`}>
                    <div className={`w-10 h-10 bg-${action.color}-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-lg">{action.icon}</span>
                    </div>
                    <div className="ml-4 flex-1">
                      <span className="font-semibold text-gray-900 block">{action.title}</span>
                      <span className="text-sm text-gray-500">{action.desc}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Recordatorios - Improved */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recordatorios</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Ver todos
                </button>
              </div>
              <div className="space-y-5">
                {[
                  { color: "blue", title: "Tomar 2L de agua hoy", time: "Diario", status: "active" },
                  { color: "green", title: "Ejercicio 30 min", time: "Lunes, Miércoles, Viernes", status: "pending" },
                  { color: "yellow", title: "Tomar suplementos", time: "Después del desayuno", status: "completed" },
                  { color: "purple", title: "Medir presión arterial", time: "Mañana 8:00 AM", status: "active" },
                  { color: "red", title: "Revisar niveles de glucosa", time: "Antes de dormir", status: "pending" },
                ].map((reminder, index) => (
                  <div key={index} className="flex items-start group cursor-pointer">
                    <div className={`w-3 h-3 mt-2 rounded-full bg-${reminder.color}-500 flex-shrink-0`}></div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {reminder.title}
                        </p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${reminder.status === 'completed' ? 'bg-green-100 text-green-700' :
                          reminder.status === 'active' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                          {reminder.status === 'completed' ? 'Completado' :
                            reminder.status === 'active' ? 'Activo' : 'Pendiente'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{reminder.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logros - Improved */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Logros</h2>
                <div className="flex items-center text-amber-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-bold">12</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🏆", title: "1ra Semana", desc: "Completada", color: "yellow", achieved: true },
                  { icon: "⭐", title: "Meta Peso", desc: "En progreso", color: "blue", achieved: false },
                  { icon: "📈", title: "Progreso 75%", desc: "+5% esta semana", color: "green", achieved: true },
                  { icon: "💪", title: "Consistencia", desc: "28 días seguidos", color: "purple", achieved: true },
                  { icon: "🏃", title: "Ejercicio", desc: "20/30 días", color: "orange", achieved: true },
                  { icon: "🥗", title: "Dieta Saludable", desc: "95% cumplido", color: "emerald", achieved: false },
                ].map((achievement, index) => (
                  <div key={index} className={`text-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${achievement.achieved
                    ? `bg-${achievement.color}-50 border-${achievement.color}-200`
                    : 'bg-gray-50 border-gray-200 opacity-70'
                    }`}>
                    <div className={`w-14 h-14 ${achievement.achieved ? `bg-${achievement.color}-100` : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-3 group`}>
                      <span className="text-2xl group-hover:scale-110 transition-transform">{achievement.icon}</span>
                    </div>
                    <p className="font-semibold text-gray-900">{achievement.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.desc}</p>
                    {achievement.achieved && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Obtenido
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}