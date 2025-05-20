export default function PreciosPage() {
  return (
    <>
      <div className="container">
        <h1>Precios de Servicios</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/precio1.jpg" className="card-img-top" alt="Precio 1" />
              <div className="card-body">
                <h5 className="card-title">Consulta Nutricional</h5>
                <p className="card-text">Precio: $500</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/precio2.jpg" className="card-img-top" alt="Precio 2" />
              <div className="card-body">
                <h5 className="card-title">Plan de Alimentación</h5>
                <p className="card-text">Precio: $800</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/precio3.jpg" className="card-img-top" alt="Precio 3" />
              <div className="card-body">
                <h5 className="card-title">Seguimiento Nutricional</h5>
                <p className="card-text">Precio: $300</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}