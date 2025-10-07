'use client';
import { AgregarArticuloController } from "@/controllers/nutriologo/agregarArticuloController";
import { PacientesController } from "@/controllers/nutriologo/pacientesController";
import { getAuthPayload } from "@/utils/auth";
import Image from "next/image";
import { useState } from "react";

export default function RegistroNutrisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    usuario: '',
    correo: '',
    contrasenia: '',
    telefono: '',
    descripcion: '',
    cedula_profesional_nutriologo: '',
    direccion_nutriologo: '',
    rol_id: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, rol_id: parseInt(e.target.value) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const uploadImage = async () => {
    if (!selectedFile) return null;

    const payload = getAuthPayload();    

    const data = new FormData();
    data.append('file', selectedFile);
    data.append("nombre", formData.nombre);
    data.append("apellido", formData.primer_apellido);
    data.append("id", payload?.id_nutriologo || "0");

    try {
      const response = await AgregarArticuloController.uploadImage(data);
      return response?.data || null;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await uploadImage();
      const userData = {
        ...formData,
        imagen: imageUrl || null,
      }

      const response = await PacientesController.addPaciente(userData);
      if (response?.data.success) {
        setFormData({
          nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          usuario: '',
          correo: '',
          contrasenia: '',
          telefono: '',
          descripcion: '',
          cedula_profesional_nutriologo: '',
          direccion_nutriologo: '',
          rol_id: 2,
        });
        setSelectedFile(null);
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mx-auto px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg mb-3">
          <h1 className="text-3xl font-bold">Registro de Usuario</h1>
        </div>
        <p className="text-gray-600">
          Complete el formulario para crear una nueva cuenta
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 p-3 m-2">
        <div className="h-1 bg-gradient-to-r from-green-100 via-green-200 to-green-300"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="form-group">
              <label
                htmlFor="nombre"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Nombre *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                placeholder="Ingrese su nombre"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="primer_apellido"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Primer Apellido *
              </label>
              <input
                type="text"
                id="primer_apellido"
                name="primer_apellido"
                value={formData.primer_apellido}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                placeholder="Ingrese su primer apellido"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="segundo_apellido"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Segundo Apellido
              </label>
              <input
                type="text"
                id="segundo_apellido"
                name="segundo_apellido"
                value={formData.segundo_apellido}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                placeholder="Ingrese su segundo apellido"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="usuario"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                Nombre de Usuario *
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                placeholder="Cree un nombre de usuario"
              />
            </div>

            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 mb-2 inline-flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Tipo de Usuario *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.rol_id === 1
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-green-600"
                    name="rol_id"
                    value={1}
                    checked={formData.rol_id === 1}
                    onChange={handleRoleChange}
                    required
                  />
                  <span className="ml-2 text-gray-700">Administrador</span>
                </label>
                <label
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.rol_id === 2
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <input
                    type="radio"
                    className="form-radio h-4 w-4 text-green-600"
                    name="rol_id"
                    value={2}
                    checked={formData.rol_id === 2}
                    onChange={handleRoleChange}
                  />
                  <span className="ml-2 text-gray-700">Nutriólogo</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="form-group">
              <label className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center">
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                Foto de Perfil
              </label>
              <div className="flex items-center justify-center">
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                  {previewImage ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                          Cambiar imagen
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-5">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500 text-center">
                        <span className="font-semibold">
                          Haz clic para subir
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG (MAX. 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="correo"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Correo Electrónico *
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                placeholder="ejemplo@dominio.com"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="contrasenia"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="contrasenia"
                  name="contrasenia"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                  placeholder="Cree una contraseña segura"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-green-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Mínimo 8 caracteres con números y símbolos
              </p>
            </div>
          </div>
        </div>

        {formData.rol_id === 1 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label
                htmlFor="telefono"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                placeholder="Número de contacto"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="descripcion"
                className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                rows={3}
                placeholder="Descripción del administrador"
              ></textarea>
            </div>
          </div>
        )}

        {formData.rol_id === 2 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div className="form-group">
                <label
                  htmlFor="telefono"
                  className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  Teléfono de Contacto *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                  placeholder="Número profesional"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="cedula_profesional"
                  className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Cédula Profesional *
                </label>
                <input
                  type="text"
                  id="cedula_profesional_nutriologo"
                  name="cedula_profesional_nutriologo"
                  value={formData.cedula_profesional_nutriologo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  required
                  placeholder="Número de cédula"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Ingrese su cédula profesional válida
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="form-group">
                <label
                  htmlFor="descripcion"
                  className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                  Descripción Profesional
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  rows={3}
                  placeholder="Especialidad y experiencia"
                ></textarea>
              </div>
              <div className="form-group">
                <label
                  htmlFor="direccion"
                  className="text-sm font-medium text-gray-700 mb-1 inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Dirección del Consultorio
                </label>
                <input
                  type="text"
                  id="direccion_nutriologo"
                  name="direccion_nutriologo"
                  value={formData.direccion_nutriologo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  placeholder="Dirección completa"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <svg
              className="w-5 h-5 text-white mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            Registrar Usuario
          </button>
        </div>
      </div>
    </div>
  );
}
