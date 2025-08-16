import Link from "next/link";

export default function MenuNutri() {
  return (
    <>
      <Link 
        href="/nutriologo" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Dashboard
      </Link>
      <div className="border-t border-gray-200 my-1"></div>
      <Link 
        href="/nutriologo/agregar-articulo" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Agregar artículo
      </Link>
      <Link 
        href="/nutriologo/agenda" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Agenda
      </Link>
      <Link 
        href="/nutriologo/pacientes" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
      >
        Pacientes
      </Link>
      <div className="border-t border-gray-200 my-1"></div>
    </>
  );
}