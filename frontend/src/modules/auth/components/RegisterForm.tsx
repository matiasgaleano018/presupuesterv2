import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="form-outline form-white mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nombre"
              name="first_name"
            />
          </div>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Apellido"
            name="last_name"
          />
        </div>
      </div>
      <div className="form-outline form-white mb-4">
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="form-outline form-white mb-4">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Contraseña"
          name="password"
        />
      </div>

      <button className="btn btn-outline-light btn-lg px-5 mb-4" type="submit">
        Registrarme
      </button>

      <div>
        <p className="mb-0">
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/login"} className="text-white-50 fw-bold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegisterForm;
