export default function ServiciosPage() {
  return (
    <>
      <div className="container">
        <h1>Servicios de Nutrición para ti</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/servicio1.jpg" className="card-img-top" alt="Servicio 1" />
              <div className="card-body">
                <h5 className="card-title">Consulta Nutricional</h5>
                <p className="card-text">Consulta personalizada con un nutriologo.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/servicio2.jpg" className="card-img-top" alt="Servicio 2" />
              <div className="card-body">
                <h5 className="card-title">Plan de Alimentación</h5>
                <p className="card-text">Plan de alimentación adaptado a tus necesidades.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/servicio3.jpg" className="card-img-top" alt="Servicio 3" />
              <div className="card-body">
                <h5 className="card-title">Seguimiento Nutricional</h5>
                <p className="card-text">Seguimiento continuo para alcanzar tus objetivos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}