import Link from "next/link";
import { IndexController } from "../indexController";
import ArticulosCarousel from "../components/ArticulosCarousel";

export default async function ArticulosPage() {
  const { articulos, primerEncabezado } = await IndexController.getArticulos();

  return (
    <>
      <ArticulosCarousel articulos={articulos} primerEncabezado={primerEncabezado} />
      <div className="container">
        <h1>Artículos Nutricionales</h1>
        <div className="row">
          {articulos.map((articulo) => (
            <div className="col-md-4 mb-4" key={articulo.id}>
              <div className="card">
                <div className="card-body">
                  <Link href={`/articulo/${articulo.id}`}>
                    <h3>{primerEncabezado[articulo.id]}</h3>
                  </Link>
                  <p className="card-text">
                    <small className="text-muted">
                      Publicado el{" "}
                      {new Date(articulo.created_at.split(" ")[0]).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}