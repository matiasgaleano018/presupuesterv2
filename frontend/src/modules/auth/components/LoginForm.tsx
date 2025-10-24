import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCallAuthApi from "../hooks/useCallAuthApi";
import Swal from "sweetalert2";

type FormData = {
  email: string;
  password: string;
};
function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await useCallAuthApi({ endPoint: "/login", body: form });

      Swal.fire({
        title: "Inicio de sesión exitoso",
        text: "Accede a tus datos financieros",
        icon: "success",
        confirmButtonText: "Ir al inicio",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate("/home");
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Error desconocido";

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-md-5 mt-md-4 pb-5">
          <div className="form-outline form-white mb-4">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={form.email}
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-outline form-white mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Contraseña"
              name="password"
              value={form.password}
              required
              onChange={handleChange}
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
