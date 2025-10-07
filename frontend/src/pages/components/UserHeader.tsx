import Avatar from "react-avatar";

function UserHeader() {
  return (
    <>
      <header className="navbar navbar-expand-md d-print-none" >
        <div className="container-xl">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu" aria-controls="navbar-menu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img src="logo.png" width="110" height="32" alt="Tabler" className="navbar-brand-image" /> Presupuester
            </a>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                <span className="avatar avatar-sm"><Avatar name="Matías Galeano" round={true} size="35" color="#4C9AFF" />
</span>
                <div className="d-none d-xl-block ps-2">
                  <div>Matias Galeano</div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="#" className="dropdown-item">Mi perfil</a>
                <a href="#" className="dropdown-item">Configuraciones</a>
                <div className="dropdown-divider"></div>
                <a href="./sign-in.html" className="dropdown-item">Cerrar sesión</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default UserHeader;
