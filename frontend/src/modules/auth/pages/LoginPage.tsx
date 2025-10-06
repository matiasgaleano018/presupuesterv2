import { useState, type ChangeEvent } from "react";
import BasicAuth from "../components/BasicAuth";
import LoginForm from "../components/LoginForm";
import useCallAuthApi from "../hooks/useCallAuthApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};
function LoginPage() {
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
        position: "top-end",
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
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
    <BasicAuth
      title="Iniciar sesión"
      subtitle="Inicia sesión y comienza a administrar tus finanzas."
    >
      <LoginForm onSubmit={handleSubmit} onChange={handleChange} {...form} />
    </BasicAuth>
  );
}

export default LoginPage;
