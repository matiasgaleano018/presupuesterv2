import { Link } from "react-router-dom";

type Props = {
  email: string;
  password: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function LoginForm({ onSubmit, onChange, email, password }: Props) {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="form-outline form-white mb-4">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={email}
              required
              onChange={onChange}
            />
          </div>

          <div className="form-outline form-white mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Contraseña"
              name="password"
              value={password}
              required
              onChange={onChange}
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
      </form>
    </>
  );
}

export default LoginForm;
