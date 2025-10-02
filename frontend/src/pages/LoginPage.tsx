import "./LoginPage.css";

function LoginPage() {
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white card-border">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <div className="container">
                      <img src="/logo.png" alt="logo" />
                    </div>
                    <h2 className="fw-bold mb-2 text-uppercase">
                      Iniciar sesión
                    </h2>
                    <p className="text-white-50 mb-5">
                      Por favor ingrese sus credenciales
                    </p>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        placeholder="Email"
                      />
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        placeholder="Contraseña"
                      />
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        ¿Olvidaste tu contraseña? Recuperar
                      </a>
                    </p>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </div>

                  <div>
                    <p className="mb-0">
                      ¿No tienes una cuenta?{" "}
                      <a href="#!" className="text-white-50 fw-bold">
                        Registrate aquí
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
