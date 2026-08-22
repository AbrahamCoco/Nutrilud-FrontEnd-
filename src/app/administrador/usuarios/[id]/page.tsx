"use client";
import { PerfilController } from "@/controllers/perfilController";
import { use, useEffect, useState } from "react";

export default function EditUserPage({ params } : { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await PerfilController.getUser(parseInt(id));
        setUser(response?.data || null);
      } catch (e) {
        console.error("Error al cargar el usuario:", e);
        setUser(null);
      }
    }

    fetchUser();
  })

  return (
    <div className="mx-auto px-2 sm:px-3 lg:px-4 py-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5">
          <h1 className="text-white text-2xl font-bold">Editar Usuario</h1>
        </div>
        {user ? (
          <div className="p-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
            <input type="text" />
          </div>
        ) : (
          <div className="p-6">
            <p className="text-gray-600">Cargando datos del usuario...</p>
          </div>
        )}
      </div>
    </div>
  );
}