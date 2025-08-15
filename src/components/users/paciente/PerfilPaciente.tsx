import { PerfilController } from "@/controllers/perfilController";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PerfilPaciente({id}:{id : number}) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await PerfilController.getUser(id);
        const data = await response?.data;
        setUserData(data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [id]);

  let edad: number | null = null;
  let fechaNacimiento: string = "No proporcionada";
  if (userData?.fechaNacimiento) {
    const nacimiento = new Date(userData.fechaNacimiento);
    const hoy = new Date();
    edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    fechaNacimiento = nacimiento.toLocaleDateString();
  }
  
  if (loading) return <p>Cargando perfil del nutriólogo...</p>;
  if (!userData) return <p>Error al cargar perfil.</p>;

  return (
    <div className="mx-auto px-2 sm:px-2 lg:px-3 py-3">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Perfil del Paciente</h1>
              <p className="text-green-100 mt-1">Historial Clínico</p>
            </div>
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="relative group">
                {userData?.foto ? (
                  <Image
                    src={`http://127.0.0.1:8080/api/v1/view/${userData.foto}`}
                    alt={`${userData.nombre} ${userData.primer_apellido}`}
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:border-green-400 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-4 group-hover:border-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-32 w-32 text-gray-400 transition-all duration-300 group-hover:text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">Ver foto</span>
                </div>
              </div>
            </div>

            <div className="md:w-3/4 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {userData?.nombre} {userData?.primer_apellido} {userData?.segundo_apellido}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {edad ? edad : "Sin edad"} años
                  </span>
                  {userData?.sexo && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                      {userData.sexo}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Información Personal
                    </h3>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Fecha de nacimiento</p>
                        <p className="text-gray-700 font-medium">{fechaNacimiento}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Correo electrónico</p>
                        <p className="text-gray-700 font-medium">{userData?.correo}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Teléfono</p>
                        <p className="text-gray-700 font-medium">{userData?.telefono || "No proporcionado"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Datos Clínicos
                    </h3>
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Estatura</p>
                        <p className="text-gray-700 font-medium">{userData?.estatura ? `${userData.estatura} m` : "No hay datos"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Peso</p>
                        <p className="text-gray-700 font-medium">{userData?.peso ? `${userData.peso} kg` : "No hay datos"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">IMC</p>
                        <p className="text-gray-700 font-medium">{userData?.imc ? `${userData.imc}` : "No hay datos"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Ver Historial Completo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}