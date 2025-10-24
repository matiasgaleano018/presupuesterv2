import { Link } from "react-router-dom";

type Props = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function RegisterForm({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  onSubmit,
  onChange,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-6">
          <div className="form-outline form-white mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nombre"
              name="firstName"
              value={firstName}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="col-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Apellido"
            name="lastName"
            value={lastName}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="form-outline form-white mb-4">
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-outline form-white mb-4">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-outline form-white mb-4">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Repetir contraseña"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <span className="text-white-50">
          <ul className="text-start">
            <li>La contraseña debe tener al menos 6 caracteres</li>
            <li>
              Debe tener al menos un número y un carácter especial (@#$.%)
            </li>
          </ul>
        </span>
      </div>

      <button className="btn btn-outline-light btn-lg px-5 mb-4" type="submit">
        Registrarme
      </button>

      <div>
        <p className="mb-0">
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/"} className="text-white-50 fw-bold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
