import AccountCard from "./AccountCard";

function AccountsCarrusel() {
  return (
    <>
      <div className="card py-4 border-0">
        <div className="card-header border-0">
          <h3 className="card-title text-white fw-bold">CUENTAS</h3>
        </div>
        <div className="card-body">
          <div
            id="carousel-controls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="container" style={{ width: "80%" }}>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <AccountCard />
                    </div>
                    <div className="carousel-item">
                      <AccountCard />
                    </div>
                    <div className="carousel-item">
                      <AccountCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carousel-controls"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Anterior</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carousel-controls"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Siguiente</span>
            </a>
          </div>
          <div className="container pt-4 d-flex justify-content-center">
            <button className="btn btn-outline-primary d-flex align-items-center justify-content-center w-100">
              <p className="mb-0 fw-bold">
                <i className="fas fa-eye px-2"></i>VER CUENTAS
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountsCarrusel;
