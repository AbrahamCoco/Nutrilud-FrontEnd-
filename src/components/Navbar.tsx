"use client";

import { NavbarController } from "@/controllers/navbarController";
import { getAuthPayload } from "@/utils/auth";
import { deleteCookie } from "@/utils/cookie";
import { Utils } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import MenuAdmin from "./users/administrador/MenuAdmin";
import MenuNutri from "./users/nutriologo/MenuNutri";
import MenuPaciente from "./users/paciente/MenuPaciente";

// Componentes de iconos reutilizables
const Icons = {
  Menu: () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Close: () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ),
  Lock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
    </svg>
  ),
};

// Componente de navegación desktop
const DesktopNavLinks = () => (
  <div className="hidden md:flex space-x-1 lg:space-x-2">
    {["Artículos", "Servicios", "Nutriólogos", "Precios", "Contacto"].map((item) => (
      <Link
        key={item}
        href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
        className="text-green-100 hover:text-white hover:bg-green-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
      >
        {item}
      </Link>
    ))}
  </div>
);

interface MobileNavLinksProps {
  onClose: () => void;
  isAuthenticated: boolean;
  rol: number | null;
  id: number | null;
}

// Componente de navegación mobile
const MobileNavLinks = ({ onClose, isAuthenticated, rol, id }: MobileNavLinksProps) => (
  <div className="md:hidden bg-green-800 shadow-inner animate-slideDown">
    <div className="px-2 pt-2 pb-4 space-y-1">
      {["Artículos", "Servicios", "Nutriólogos", "Precios", "Contacto"].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
          className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-green-700 transition-colors duration-200"
          onClick={onClose}
        >
          {item}
        </Link>
      ))}
      {isAuthenticated && (
        <Link
          href={`/perfil/${rol}/${id}`}
          className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-green-700 transition-colors duration-200"
          onClick={onClose}
        >
          Mi Perfil
        </Link>
      )}
    </div>
  </div>
);

// Componente de avatar de usuario
interface UserAvatarProps {
  fotoPerfil: string;
  nombre: string;
  onClick: () => void;
}

const UserAvatar = ({ fotoPerfil, nombre, onClick }: UserAvatarProps) => (
  <button onClick={onClick} className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-700 rounded-full">
    {fotoPerfil ? (
      <Image
        src={fotoPerfil}
        alt={`Foto de perfil de ${nombre}`}
        className="h-9 w-9 lg:h-10 lg:w-10 rounded-full object-cover border-2 border-white group-hover:border-green-200 transition-all duration-200"
        width={40}
        height={40}
      />
    ) : (
      <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-green-800 flex items-center justify-center border-2 border-white group-hover:border-green-200 transition-all duration-200">
        <Icons.User />
      </div>
    )}
    <span className="hidden lg:inline text-white font-medium group-hover:text-green-100 transition-colors duration-200">
      {nombre.split(" ")[0]}
    </span>
    <Icons.ChevronDown />
  </button>
);

export default function Navbar() {
  const [id, setId] = useState<number | null>(null);
  const [rol, setRol] = useState<number | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [contrasenia, setContrasenia] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fotoPerfil, setFotoPerfil] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [usuarioError, setUsuarioError] = useState<string | null>(null);
  const [contraseniaError, setContraseniaError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Variable computada para saber si el usuario está autenticado
  const isAuthenticated = rol !== null;

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cargar datos de sesión
  useEffect(() => {
    const payload = getAuthPayload();
    if (payload?.rol_id && payload?.id) {
      const storedRol = payload.rol_id;
      const storedId = payload.id;
      const nombreUsuario = `${payload?.nombre || ""} ${payload?.primer_apellido || ""}`;
      setNombre(nombreUsuario);
      setRol(parseInt(storedRol.toString()));
      setId(parseInt(storedId.toString()));
      if (payload?.foto_perfil) {
        setFotoPerfil(payload.foto_perfil);
      }
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const loginResult = await NavbarController.login(usuario || "", contrasenia || "");

      if (loginResult && loginResult.decode) {
        const { decode } = loginResult;

        setUsuarioError(null);
        setContraseniaError(null);

        setNombre(`${decode.payload.nombre} ${decode.payload.primer_apellido}`);
        setRol(parseInt(decode.payload.rol_id.toString()));
        setId(parseInt(decode.payload.id.toString()));
        setUsuario("");
        setContrasenia("");
        closeModal();

        if (decode.payload.foto_perfil) {
          setFotoPerfil(decode.payload.foto_perfil);
        }

        // Redirección basada en rol
        const decodedRolId = parseInt(decode.payload.rol_id.toString());
        const decodedId = parseInt(decode.payload.id.toString());
        const redirectMap: Record<number, string> = {
          1: "/administrador",
          2: "/nutriologo",
          3: `/paciente/${decodedId}`,
        };
        router.push(redirectMap[decodedRolId] || "/");

        Utils.swalSuccess("Inicio de sesión exitoso");
      } else {
        const data = loginResult?.data;
        setRol(null);
        setId(null);
        setUsuarioError(null);
        setContraseniaError(null);

        if (data?.message === "Usuario no encontrado") {
          setUsuarioError(data.message);
        } else if (data?.message === "Contraseña incorrecta") {
          setContraseniaError(data.message);
        }

        Utils.swalError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setRol(null);
      setId(null);
      setUsuario("");
      setContrasenia("");
      closeModal();
      Utils.swalError("Usuario o contraseña incorrectos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = useCallback(async () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
      deleteCookie("auth_token");
      setRol(null);
      setId(null);
      setNombre("");
      setFotoPerfil("");
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      await router.replace("/");
      Utils.swalSuccess("Cierre de sesión exitoso");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Utils.swalError("Error al cerrar sesión");
    }
  }, [router]);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setUsuarioError(null);
    setContraseniaError(null);
    setUsuario("");
    setContrasenia("");
    document.body.style.overflow = "";
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="bg-gradient-to-r from-green-800 to-green-700 shadow-lg sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:h-20 items-center">
            {/* Logo y menú móvil */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-white p-2 rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
              </button>

              <Link href="/" className="flex items-center space-x-2 group">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-green-100 transition-colors duration-200">
                  Nutrilud
                </span>
              </Link>
            </div>

            {/* Links desktop */}
            <DesktopNavLinks />

            {/* Acciones usuario */}
            <div className="flex items-center gap-2 sm:gap-4">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <UserAvatar
                    fotoPerfil={fotoPerfil}
                    nombre={nombre}
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                  />

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out origin-top-right">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{nombre}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {rol === 1 ? "Administrador" : rol === 2 ? "Nutriólogo" : "Paciente"}
                        </p>
                      </div>

                      <div className="py-1">
                        {rol === 1 && <MenuAdmin onClose={() => setIsDropdownOpen(false)} />}
                        {rol === 2 && <MenuNutri onClose={() => setIsDropdownOpen(false)} />}
                        {rol === 3 && <MenuPaciente id={id} onClose={() => setIsDropdownOpen(false)} />}

                        <Link
                          href={`/perfil/${rol}/${id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          📋 Mi Perfil
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          🚪 Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={openModal}
                  className="bg-white hover:bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <MobileNavLinks
            onClose={() => setIsMobileMenuOpen(false)}
            isAuthenticated={isAuthenticated}
            rol={rol}
            id={id}
          />
        )}
      </nav>

      {/* Modal de inicio de sesión */}
      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            aria-hidden="true"
            onClick={closeModal}
          />

          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div
              ref={modalRef}
              className="relative bg-white rounded-2xl shadow-2xl transform transition-all duration-300 max-w-md w-full mx-auto animate-slideUp z-[101]"
            >
              <div className="p-6 sm:p-8">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-4">
                  <Icons.Lock />
                </div>

                <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
                  Iniciar Sesión
                </h3>

                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                        Usuario
                      </label>
                      <input
                        type="text"
                        id="usuario"
                        className={`
                          w-full px-4 py-3 rounded-lg border transition-all duration-200 ease-in-out
                          focus:ring-2 focus:ring-offset-1 focus:outline-none
                          ${usuarioError
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                          }
                          placeholder-gray-400 text-gray-800
                          shadow-sm hover:shadow-md
                        `}
                        value={usuario ?? ""}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder="Ingresa tu nombre de usuario"
                        autoFocus
                        disabled={isLoading}
                      />
                      {usuarioError && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          {usuarioError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contrasenia" className="block text-sm font-medium text-gray-700 mb-1">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="contrasenia"
                        className={`
                          w-full px-4 py-3 rounded-lg border transition-all duration-200 ease-in-out
                          focus:ring-2 focus:ring-offset-1 focus:outline-none
                          ${contraseniaError
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                          }
                          placeholder-gray-400 text-gray-800
                          shadow-sm hover:shadow-md
                        `}
                        value={contrasenia ?? ""}
                        onChange={(e) => setContrasenia(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        disabled={isLoading}
                      />
                      {contraseniaError && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          {contraseniaError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col-reverse sm:flex-row sm:gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-3 sm:mb-0"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Ingresando...
                        </>
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}