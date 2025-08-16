"use client";
import { PerfilController } from "@/controllers/perfilController";
import { Utils } from "@/utils/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PerfilAdmin( {id} : {id: number} ) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await PerfilController.getUser(id);
        const data = await response?.data;
        setUserData(data);
        Utils.swalSuccess("Datos de perfil cargados correctamente");
      } catch(error) {
        Utils.swalError("No se pudieron cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    }

    fetchPerfil();
  }, [id]);

  if (loading) return <p>Cargando perfil del nutriólogo...</p>;
  if (!userData) return <p>Error al cargar perfil.</p>;

  return (
    <div className="mx-auto px-2 sm:px-2 lg:px-3 py-3">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Perfil Administrativo</h1>
              <p className="text-green-100 mt-1">Sistema de Gestión</p>
            </div>
            <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group">
                {userData?.foto ? (
                  <Image
                    src={userData.foto}
                    alt={`${userData.nombre} ${userData.primer_apellido}`}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:border-green-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-4 group-hover:border-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24 text-gray-400 transition-all duration-300 group-hover:text-green-500"
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

            <div className="md:w-2/3 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {userData?.nombre} {userData?.primer_apellido} {userData?.segundo_apellido}
                </h2>
                <p className="text-green-600 font-medium mt-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Administrador del Sistema
                </p>
              </div>

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
                      <p className="text-xs font-medium text-gray-500">Nombre completo</p>
                      <p className="text-gray-700 font-medium">
                        {userData?.nombre} {userData?.primer_apellido} {userData?.segundo_apellido}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg hover:bg-green-50 transition-colors duration-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Datos de Contacto
                  </h3>
                  <div className="mt-3 space-y-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}