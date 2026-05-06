import Link from "next/link";

export default function MenuPaciente({ id, onClose }: { id: number | null; onClose: () => void }) {
  return (
    <>
      <Link 
        href="/paciente" 
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
        onClick={onClose}
      >
        Dashboard
      </Link>
      <Link
        href={`/paciente/${id}`}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
        onClick={onClose}
      >
        Mi dia
      </Link>
      <div className="border-t border-gray-200 my-1"></div>
    </>
  );
}