import { use } from "react";

export default function EditUserPage({ params } : { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="mx-auto px-2 sm:px-3 lg:px-4 py-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5">
          <h1 className="text-white text-2xl font-bold">Editar Usuario</h1>
        </div>
        <div className="p-6">
          
        </div>
      </div>
    </div>
  );
}