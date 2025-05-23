import Link from "next/link";

export default function MenuAdmin() {
  return (
    <>
      <Link 
        href="/administrador" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Dashboard
      </Link>
      <div className="border-t border-gray-200 my-1"></div>
      <Link 
        href="/administrador/registro" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Registrar usuarios
      </Link>
      <Link 
        href="/administrador/usuarios" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Listar usuarios
      </Link>
      <div className="border-t border-gray-200 my-1"></div>
    </>
  );
}