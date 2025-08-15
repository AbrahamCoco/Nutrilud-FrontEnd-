"use client";
import { ConsultaController } from "@/controllers/nutriologo/consultaController";
import { PacientesController } from "@/controllers/nutriologo/pacientesController";
import { Utils } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditarPacientePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [formData, setFormData] = useState({
    rol_id: 3,
    foto_paciente: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    usuario: "",
    correo: "",
    telefono_paciente: "",
    fecha_nacimiento_paciente: "",
    sexo_paciente: "Masculino",
    alergias_paciente: ""
  });
  const [id_user, setIdUser] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        setIsLoading(true);
        const response = await ConsultaController.getPacienteId(Number(id));
        if (response?.data) {
          const p = response.data;
          setIdUser(p.id);
          const [nombre = "", primer_apellido = "", segundo_apellido = ""] = p.nombrePaciente.split(" ");  
          setFormData({
            rol_id: 3,
            foto_paciente: p.fotoPaciente || "",
            nombre: nombre || "",
            primer_apellido: primer_apellido || "",
            segundo_apellido: segundo_apellido || "",
            usuario: p.usuario || "",
            correo: p.correo || "",
            telefono_paciente: p.telefono || "",
            fecha_nacimiento_paciente: p.fechaNacimiento ? p.fechaNacimiento.split("T")[0] : "",
            sexo_paciente: p.sexo || "Masculino",
            alergias_paciente: p.alergias || ""
          });
        } else {
          Utils.swalError("No se pudo cargar el paciente.");
        }
      } catch (error) {
        Utils.swalError("Error al cargar el paciente.");
        console.error("Error fetching patient:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaciente();
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre) newErrors.nombrePaciente = "nombrePaciente es requerido";
    if (!formData.primer_apellido) newErrors.primer_apellido = "Apellido es requerido";
    if (!formData.usuario) newErrors.usuario = "Usuario es requerido";
    if (!formData.correo) {
      newErrors.correo = "Correo es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.correo)) {
      newErrors.correo = "Correo no válido";
    }
    if (!formData.telefono_paciente) newErrors.telefono = "Teléfono es requerido";
    if (!formData.fecha_nacimiento_paciente) newErrors.fecha_nacimiento = "Fecha de nacimiento es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePaciente = async () => {
    if (!validateForm()) return;
    try {
      setIsLoading(true);
      const response = await PacientesController.updatePaciente(Number(id_user), formData);
      console.log("Update response:", response);
      if (response?.success) {
        router.push("/nutriologo/pacientes");
      } else {
        Utils.swalError(response?.message || "Error al actualizar el paciente.");
      }
    } catch (error) {
      Utils.swalError("Error al actualizar el paciente.");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  {isLoading && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500">
        <svg className="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>
  )}

  return (
    <div className="mx-auto p-3">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            Editar Información del Paciente
          </h2>
          <p className="text-green-100">Actualiza los datos personales de: {formData.nombre}</p>
        </div>

          {/* Foto del paciente */}
          <div className="space-y-2 m-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto del paciente</label>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {selectedFile ? (
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-gray-400">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <label className="cursor-pointer">
                <div className="px-4 py-2 bg-white border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2">
                  <span>{selectedFile ? "Cambiar imagen" : "Seleccionar imagen"}</span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          {/* Información personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="nombre"
                  className={`w-full border ${errors.nombrePaciente ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre(s)"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 absolute left-3 top-3 text-gray-400">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.nombrePaciente && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {errors.nombrePaciente}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Primer apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="primer_apellido"
                className={`w-full border ${errors.primer_apellido ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
                value={formData.primer_apellido}
                onChange={handleChange}
                placeholder="Apellido paterno"
              />
              {errors.primer_apellido && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {errors.primer_apellido}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Segundo apellido</label>
              <input
                type="text"
                name="segundo_apellido"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                value={formData.segundo_apellido}
                onChange={handleChange}
                placeholder="Apellido materno"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Usuario <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="usuario"
                className={`w-full border ${errors.usuario ? 'border-red-500' : 'border-gray-300'} px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
                value={formData.usuario}
                onChange={handleChange}
                placeholder="Nombre de usuario"
              />
              {errors.usuario && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {errors.usuario}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="correo"
                  className={`w-full border ${errors.correo ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 absolute left-3 top-3 text-gray-400">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              {errors.correo && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {errors.correo}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="telefono"
                  className={`w-full border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
                  value={formData.telefono_paciente}
                  onChange={handleChange}
                  placeholder="Número de teléfono"
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 absolute left-3 top-3 text-gray-400">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.telefono && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {errors.telefono}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de nacimiento <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="fecha_nacimiento"
                  className={`w-full border ${errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'} px-4 py-2 pl-10 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
                  value={formData.fecha_nacimiento_paciente}
                  onChange={handleChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 absolute left-3 top-3 text-gray-400">
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                </svg>
              </div>
              {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                {errors.fecha_nacimiento}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sexo</label>
              <div className="flex gap-6 pt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sexo_paciente"
                    value="Masculino"
                    checked={formData.sexo_paciente === "Masculino"}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Masculino</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sexo_paciente"
                    value="Femenino"
                    checked={formData.sexo_paciente === "Femenino"}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Femenino</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Alergias</label>
              <input
                type="text"
                name="alergias"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                value={formData.alergias_paciente}
                onChange={handleChange}
                placeholder="Lista de alergias conocidas"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 m-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
              disabled={isLoading}
              onClick={handleUpdatePaciente}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          </div>
      </div>
    </div>
  );
}