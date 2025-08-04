"use client";
import { NavbarController } from "@/controllers/navbarController";
import { Utils } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuAdmin from "./users/administrador/MenuAdmin";
import MenuNutri from "./users/nutriologo/MenuNutri";
import MenuPaciente from "./users/paciente/MenuPaciente";

export default function Navbar(){
  const [id, setId] = useState<number | null>(null);
  const [rol, setRol] = useState<number | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null);
  const [contrasenia, setContrasenia] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fotoPerfil, setFotoPerfil] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const storedRol = sessionStorage.getItem("trol_id");
    const storedId = sessionStorage.getItem("id");
    const nombreUsuario = `${sessionStorage.getItem("nombre") || ""} ${sessionStorage.getItem("primer_apellido") || ""}`;
    setNombre(nombreUsuario);

    if(storedRol) setRol(parseInt(storedRol));
    if(storedId) setId(parseInt(storedId));
    if (!storedRol || !storedId) router.push("/");
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await NavbarController.login(usuario || "", contrasenia || "");

      if (response) {
        const id_paciente = response.payload.id_paciente;
        setNombre(`${response.payload.nombre} ${response.payload.primer_apellido}`);
        setRol(parseInt(response.payload.rol_id.toString()));
        setId(parseInt(response.payload.id.toString()));
        setUsuario("");
        setContrasenia("");
        closeModal();

        if (parseInt(response.payload.rol_id.toString()) === 1) {
          router.push("/administrador");
        } else if (parseInt(response.payload.rol_id.toString()) === 2) {
          router.push("/nutriologo");
        } else if (parseInt(response.payload.rol_id.toString()) === 3) {
          router.push(`/paciente/${id_paciente}`);
        } else {
          router.push("/");
        }

        Utils.swalSuccess("Inicio de sesión exitoso");
      } else {
        setRol(null);
        setId(null);
        setUsuario("");
        setContrasenia("");
        closeModal();
        Utils.swalError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setRol(null);
      setId(null);
      closeModal();
      Utils.swalError(error as string);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.clear();
      localStorage.clear();
      setRol(null);
      setId(null);
      router.replace("/");
      Utils.swalSuccess("Cierre de sesión exitoso");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className="bg-green-700 shadow-lg sticky top-0 z-50">
        <div className="mx-auto px-3 sm:px-3 lg:px-4">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-8">
              <button onClick={toggleMobileMenu} className="md:hidden text-white focus:outline-none" aria-label="Toggle menu">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <span className="ml-3 text-2xl font-bold text-white">Nutrilud</span>
                </div>
              </Link>

              <div className="hidden md:flex space-x-6">
                <Link href="/articulo" className="text-green-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Artículos
                </Link>
                <Link href="/servicios" className="text-green-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Servicios
                </Link>
                <Link href="/nutriologos" className="text-green-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Nutriólogos
                </Link>
                <Link href="/precios" className="text-green-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Precios
                </Link>
                <Link href="/contacto" className="text-green-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Contacto
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              {rol ? (
                <div className="flex items-center space-x-4">
                  <Link href={`/perfil/${id}/${rol}`} className="hidden md:block text-green-100 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200">
                    Mi Perfil
                  </Link>
                  <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                      {fotoPerfil ? (
                        <Image src={fotoPerfil} alt="Foto de perfil" className="h-10 w-10 rounded-full object-cover border-2 border-white" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-green-800 flex items-center justify-center border-2 border-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                      <span className="hidden md:inline text-white font-medium">{nombre}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                        {rol === 1 ? <MenuAdmin /> : rol === 2 ? <MenuNutri /> : rol === 3 ? <MenuPaciente /> : null}
                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200">
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button onClick={openModal} className="bg-white hover:bg-green-50 text-green-700 px-4 py-2 rounded-md font-medium transition-colors duration-200 shadow-sm border border-green-800">
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-green-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/articulo" className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md">
                Artículos
              </Link>
              <Link href="/servicios" className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md">
                Servicios
              </Link>
              <Link href="/nutriologos" className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md">
                Nutriólogos
              </Link>
              <Link href="/precios" className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md">
                Precios
              </Link>
              <Link href="/contacto" className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md">
                Contacto
              </Link>
              {rol && (
                <Link href={`/perfil/${id}/${rol}`} className="block px-3 py-2 text-base font-medium text-white hover:bg-green-700 rounded-md">
                  Mi Perfil
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {showModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={closeModal}></div>

          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 relative z-[101]">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Iniciar Sesión</h3>
                <div className="mt-4">
                  <div className="text-left">
                    <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                      Usuario
                    </label>
                    <input
                      type="text"
                      name="usuario"
                      id="usuario"
                      className="mt-1 focus:ring-green-600 focus:border-green-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      value={usuario ?? ""}
                      onChange={(e) => setUsuario(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="mt-4 text-left">
                    <label htmlFor="contrasenia" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="contrasenia"
                      id="contrasenia"
                      className="mt-1 focus:ring-green-600 focus:border-green-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                      value={contrasenia ?? ""}
                      onChange={(e) => setContrasenia(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-700 text-base font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm transition-colors duration-200"
                  onClick={handleLogin}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm transition-colors duration-200"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}