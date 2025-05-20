export default async function Home() {
  return (
  <>
    <div id="articulosCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner"></div>
      <button className="carousel-control-prev" type="button" data-bs-target="#articulosCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#articulosCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    <div className="container">
      <h1>Servicios de Nutriocion para ti</h1>
      <div className="row">{/* Aquí se pueden agregar los artículos */}</div>
    </div>

    <div className="container">
      <h1>Conozca a nuestros expertos nutricionistas</h1>
      <div className="row">{/* Aquí se pueden agregar los artículos */}</div>
    </div>

    <div className="container">
      <h1>Comentarios de nuestros pacientes</h1>
      <div className="row">{/* Aquí se pueden agregar los artículos */}</div>
    </div>

    <h1 className="text-3xl font-bold text-blue-500">
      ¡Tailwind está funcionando!
    </h1>
  </>
  );
}
