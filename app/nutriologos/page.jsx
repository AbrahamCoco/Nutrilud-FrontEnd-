export default function NutriologosPage() {
  return (
    <>
      <div className="container">
        <h1>Nutriologos</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/nutriologo1.jpg" className="card-img-top" alt="Nutriologo 1" />
              <div className="card-body">
                <h5 className="card-title">Nutriologo 1</h5>
                <p className="card-text">Descripción del nutriologo 1.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/nutriologo2.jpg" className="card-img-top" alt="Nutriologo 2" />
              <div className="card-body">
                <h5 className="card-title">Nutriologo 2</h5>
                <p className="card-text">Descripción del nutriologo 2.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <img src="/images/nutriologo3.jpg" className="card-img-top" alt="Nutriologo 3" />
              <div className="card-body">
                <h5 className="card-title">Nutriologo 3</h5>
                <p className="card-text">Descripción del nutriologo 3.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}