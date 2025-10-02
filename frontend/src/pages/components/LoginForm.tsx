import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <div className="mb-md-5 mt-md-4 pb-5">
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

        <button className="btn btn-outline-light btn-lg px-5" type="submit">
          Ingresar
        </button>
      </div>

      <div>
        <p className="mb-0">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-white-50 fw-bold">
            Registrate aquí
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginForm;
