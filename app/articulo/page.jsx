import Link from "next/link";
import { IndexController } from "../indexController";
import ArticulosCarousel from "../components/ArticulosCarousel";

export default async function ArticulosPage() {
  const { articulos, primerEncabezado } = await IndexController.getArticulos();

  return (
    <>
      <ArticulosCarousel articulos={articulos} primerEncabezado={primerEncabezado} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center md:text-left">Artículos Nutricionales</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articulos.map((articulo) => (
            <div key={articulo.id} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                <Link href={`/articulo/${articulo.id}`} className="block p-6 flex-grow">
                  <h3
                    className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-200 mb-3"
                    dangerouslySetInnerHTML={{
                      __html: primerEncabezado[articulo.id],
                    }}
                  />

                  <p className="text-gray-500 text-sm mt-auto">
                    Publicado el{" "}
                    <span className="font-medium">
                      {new Date(articulo.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
