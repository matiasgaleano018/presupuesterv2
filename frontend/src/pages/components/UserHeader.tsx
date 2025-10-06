function UserHeader() {
  return (
    <>
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src="/logo.png"
                alt="logo"
                width="110"
                height="32"
                className="navbar-brand-image"
              />
            </a>
            Hola, Matias
          </h1>
          <div className="nav-item flex-row order-md-last"></div>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <div className="d-xl-block">
                  <button className="btn btn-outline-light">
                    <i className="far fa-user"></i>
                  </button>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="./profile.html" className="dropdown-item">
                  Mi perfil
                </a>
                <div className="dropdown-divider"></div>
                <a href="./settings.html" className="dropdown-item">
                  Configuración
                </a>
                <a href="./sign-in.html" className="dropdown-item">
                  Cerrar sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default UserHeader;
